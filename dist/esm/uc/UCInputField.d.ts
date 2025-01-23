import { type DataType, Validation } from '../dt/index.js';
import type { UCFieldKey, UCWording } from './def.js';
import { UCInputFieldChangeOperator, type UCInputFieldDef, type UCInputFieldValue } from './input-field.js';
import { rVal0, rValArr, type reqVal0 } from './utils/rVal.js';
export declare class UCInputField<T extends DataType> {
    key: UCFieldKey;
    def: UCInputFieldDef<T>;
    private dynamicWording;
    private value;
    constructor(key: UCFieldKey, def: UCInputFieldDef<T>);
    clear(): void;
    getDynamicWording(): Partial<UCWording> | undefined;
    getValue(): UCInputFieldValue<T>;
    rVal0(): ReturnType<typeof rVal0<T>>;
    reqVal0(): ReturnType<typeof reqVal0<T>>;
    rValArr(): ReturnType<typeof rValArr<T>>;
    setValue(op: UCInputFieldChangeOperator, value: UCInputFieldValue<T>): void;
    updateDef(def: UCInputFieldDef<T>): void;
    updateDynamicWording(dynamicWording: Partial<UCWording> | undefined): void;
    updateType(type: UCInputFieldDef<T>['type']): void;
    validateMandatoriness(): Validation;
    validate(): Validation;
}
