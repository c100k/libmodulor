import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UC } from '../UC.js';
interface Opts {
    /**
     * @defaultValue false
     */
    forceArrayAsEmpty?: boolean | undefined;
    /**
     * @defaultValue true
     */
    forceBooleanAsFalse?: boolean | undefined;
    /**
     * @defaultValue false
     */
    ignoreTransient?: boolean | undefined;
    /**
     * @defaultValue false
     */
    ignoreUndefined?: boolean | undefined;
}
export declare function rInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, opts?: Opts): NonNullable<I>;
export {};
