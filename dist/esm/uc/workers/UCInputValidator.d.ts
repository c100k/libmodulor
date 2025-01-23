import { WordingManager } from '../../i18n/index.js';
import type { I18nManager, Worker } from '../../std/index.js';
import type { UC } from '../UC.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    uc: UC<I, OPI0, OPI1>;
}
export declare class UCInputValidator implements Worker<Input, void> {
    private i18nManager;
    private wordingManager;
    constructor(i18nManager: I18nManager, wordingManager: WordingManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ uc }: Input<I, OPI0, OPI1>): void;
}
export {};
