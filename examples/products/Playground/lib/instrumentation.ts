import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
    defaultResource,
    resourceFromAttributes,
} from '@opentelemetry/resources';
import { NodeSDK, tracing } from '@opentelemetry/sdk-node';
import {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

import { InstrumentationOTL } from '../../../../dist/esm/index.instrumentation-otl.js';

const EXPORTER_TYPES = ['console', 'otlp'] as const;
type ExporterType = (typeof EXPORTER_TYPES)[number];

const EXPORTER_TYPE: ExporterType = 'otlp';
const SERVICE_NAME = 'Playground';
const SERVICE_VERSION = '0.1.0';
const LIB_PATH = '../../../../../dist/esm/index.js';
// Jaeger local with : docker run -p 4317:4317 -p 4318:4318 -p 16686:16686 jaegertracing/jaeger:2.19.0
const OTLP_EXPORTER_URL = 'http://localhost:4318/v1/traces';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// @ts-expect-error
const pwd = process.env.PWD?.split('/');
const targetName = pwd?.[pwd.length - 1] ?? 'some-server';
const serviceName = `${SERVICE_NAME}_${targetName}`;
const resource = defaultResource().merge(
    resourceFromAttributes({
        [ATTR_SERVICE_NAME]: serviceName,
        [ATTR_SERVICE_VERSION]: SERVICE_VERSION,
    }),
);

let traceExporter!: tracing.SpanExporter;
switch (EXPORTER_TYPE) {
    // @ts-expect-error
    case 'console':
        traceExporter = new tracing.ConsoleSpanExporter();
        break;
    case 'otlp':
        traceExporter = new OTLPTraceExporter({
            url: OTLP_EXPORTER_URL,
        });
        break;
    default:
        EXPORTER_TYPE satisfies never;
}

const sdk = new NodeSDK({
    instrumentations: [
        getNodeAutoInstrumentations(),
        new InstrumentationOTL({
            libPath: LIB_PATH,
        }),
    ],
    resource,
    traceExporter,
});

sdk.start();
