import type { UC } from '../UC.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
interface Opts {
    forceArrayAsEmpty?: boolean | undefined;
    forceBooleanAsFalse?: boolean | undefined;
    ignoreTransient?: boolean | undefined;
    ignoreUndefined?: boolean | undefined;
}
export declare function rInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, opts?: Opts): NonNullable<I>;
export {};
