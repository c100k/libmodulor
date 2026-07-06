import { context, SpanStatusCode, trace } from '@opentelemetry/api';
import { InstrumentationBase, InstrumentationNodeModuleDefinition, } from '@opentelemetry/instrumentation';
const LIB_NAME = 'libmodulor';
const LIB_VERSION = '';
const LIB_MIN_VERSION = '*';
const NAME = `instrumentation-${LIB_NAME}`;
const TRACABLES = {
    [LIB_NAME]: {
        SimpleUCManager: [
            'commitTx',
            'confirmClient',
            'execClient',
            'execServer',
            'initServer',
            'persist',
            'persistProjection',
            'rollbackTx',
        ],
        UCExecChecker: ['exec'],
        UCInputFilesProcessor: ['exec'],
        UCInputValidator: ['exec'],
        UCOutputFilesProcessor: ['exec'],
    },
    [`${LIB_NAME}/uc-data-store-knex`]: {
        KnexUCDataStore: [
            'clear',
            'destroy',
            'exists',
            'init',
            'initSync',
            'read',
            'readProjection',
            'startTx',
            'supportedSpecificBindings',
            'testKey',
            'write',
            'writeBulk',
            'writeProjection',
        ],
    },
};
export class InstrumentationOTL extends InstrumentationBase {
    constructor(config) {
        super(NAME, LIB_VERSION, config);
    }
    init() {
        const namespaces = Object.keys(TRACABLES);
        const defs = namespaces.map((namespace) => new InstrumentationNodeModuleDefinition(this.moduleName(namespace, this._config.libPath), [LIB_MIN_VERSION], (moduleExports) => this.wrapAll(moduleExports, namespace), (moduleExports) => this.unwrapAll(moduleExports, namespace)));
        return defs;
    }
    moduleName(namespace, libPath) {
        if (!libPath) {
            return namespace; // e.g. libmodulor, libmodulor/uc-data-store-knex
        }
        if (!namespace.includes('/')) {
            return libPath; // ../../../index.js
        }
        const moduleName = namespace.split('/')[1];
        return libPath.replace('.js', `.${moduleName}.js`); // e.g. ../../../index.uc-data-store-knex.js
    }
    patchMethod(namespace, className, methodName) {
        return (original) => {
            const tracer = this.tracer;
            const spanName = `${className}.${methodName}`;
            // biome-ignore lint/suspicious/noExplicitAny: can be anything
            return function patched(...args) {
                const span = tracer.startSpan(spanName, {
                    attributes: {
                        'scope.name': namespace,
                    },
                });
                const ctx = trace.setSpan(context.active(), span);
                return context.with(ctx, async () => {
                    try {
                        const res = await original.apply(this, args);
                        span.setStatus({
                            code: SpanStatusCode.OK,
                        });
                        return res;
                    }
                    catch (err) {
                        span.recordException(err);
                        span.setStatus({
                            code: SpanStatusCode.ERROR,
                            message: err.message,
                        });
                        throw err;
                    }
                    finally {
                        span.end();
                    }
                });
            };
        };
    }
    unwrapAll(moduleExports, namespace) {
        // biome-ignore lint/style/noNonNullAssertion: we want it
        const entries = Object.entries(TRACABLES[namespace]);
        for (const [className, methodNames] of entries) {
            for (const methodName of methodNames) {
                // biome-ignore lint/style/noNonNullAssertion: we want it
                this._unwrap(moduleExports[className].prototype, methodName);
            }
        }
        return moduleExports;
    }
    wrapAll(moduleExports, namespace) {
        // biome-ignore lint/style/noNonNullAssertion: we want it
        const entries = Object.entries(TRACABLES[namespace]);
        for (const [className, methodNames] of entries) {
            for (const methodName of methodNames) {
                this._wrap(
                // biome-ignore lint/style/noNonNullAssertion: we want it
                moduleExports[className].prototype, methodName, this.patchMethod(namespace, className, methodName).bind(this));
            }
        }
        return moduleExports;
    }
}
