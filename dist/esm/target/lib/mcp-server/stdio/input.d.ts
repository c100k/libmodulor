import type { JSONSchemaObjectProperties } from '../../../../dt/index.js';
import type { UCInput } from '../../../../uc/index.js';
export type StdioToolInput<I extends UCInput | undefined = undefined> = I & {
    _reserved?: {
        confirmed?: boolean;
    };
};
export declare const RESERVED_KEY: "_reserved";
export declare const RESERVED_CONFIRMED_KEY: "confirmed";
export declare function stdioToolInputSchema(): JSONSchemaObjectProperties;
