import { type DataType, Validation } from '../dt/index.js';
import type { UCFieldKey, UCWording } from './def.js';
import { UCInputFieldChangeOperator, type UCInputFieldDef, type UCInputFieldValue } from './input-field.js';
import { rVal0, rValArr, type reqVal0 } from './utils/rVal.js';
export declare class UCInputField<T extends DataType> {
    key: UCFieldKey;
    def: UCInputFieldDef<T>;
    /**
     * In some cases, the wording needs to be adapted in function of the context and not be statically fetched from {@link I18nManager}.
     *
     * For instance, when the user does X, then the description becomes Y.
     */
    private dynamicWording;
    private value;
    constructor(key: UCFieldKey, def: UCInputFieldDef<T>);
    clear(): void;
    getDynamicWording(): Partial<UCWording> | undefined;
    getValue(): UCInputFieldValue<T>;
    /**
     * Read the value as a primitive
     *
     * Unlike the standalone {@link rVal0}, it returns the default value if present.
     *
     * @returns
     */
    rVal0(): ReturnType<typeof rVal0<T>>;
    /**
     * Require the value as a primitive
     *
     * Unlink the standalone {@link reqVal0}, it returns the default value if present.
     *
     * Otherwise, it throws an error.
     *
     * @returns
     */
    reqVal0(): ReturnType<typeof reqVal0<T>>;
    /**
     * Require the value as an array
     *
     * Unlink the standalone {@link rValArr}, it returns the default value in an array if present.
     *
     * @returns
     */
    rValArr(): ReturnType<typeof rValArr<T>>;
    setValue(op: UCInputFieldChangeOperator, value: UCInputFieldValue<T>): void;
    updateDef(def: UCInputFieldDef<T>): void;
    updateDynamicWording(dynamicWording: Partial<UCWording> | undefined): void;
    updateType(type: UCInputFieldDef<T>['type']): void;
    validateMandatoriness(): Validation;
    validate(): Validation;
}
