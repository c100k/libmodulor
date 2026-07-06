import { type InstrumentationConfig as BaseInstrumentationConfig, InstrumentationBase, type InstrumentationModuleDefinition } from '@opentelemetry/instrumentation';
export type InstrumentationOTLConfig = BaseInstrumentationConfig & {
    libPath?: string;
};
export declare class InstrumentationOTL extends InstrumentationBase<InstrumentationOTLConfig> {
    constructor(config: InstrumentationOTLConfig);
    protected init(): InstrumentationModuleDefinition | InstrumentationModuleDefinition[] | undefined;
    private moduleName;
    private patchMethod;
    private unwrapAll;
    private wrapAll;
}
