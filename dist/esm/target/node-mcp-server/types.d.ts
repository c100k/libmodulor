import type { UCInput } from '../../uc/index.js';
export type ToolInput<I extends UCInput | undefined = undefined> = I & {
    _reserved?: {
        confirmed?: boolean;
    };
};
