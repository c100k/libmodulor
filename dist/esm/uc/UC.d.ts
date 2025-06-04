import type { AppManifest } from '../app/index.js';
import { type DataType, Validation } from '../dt/index.js';
import type { UCAuth } from './auth.js';
import type { UCDef, UCFieldKey } from './def.js';
import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
import { UCInputField } from './UCInputField.js';
import type { reqVal0, rVal0, rValArr } from './utils/rVal.js';
export type ArgsTuple<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = ConstructorParameters<typeof UC<I, OPI0, OPI1>>;
export type ArgsRecord<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = {
    appManifest: ArgsTuple<I, OPI0, OPI1>[0];
    def: ArgsTuple<I, OPI0, OPI1>[1];
    auth: ArgsTuple<I, OPI0, OPI1>[2];
};
export declare class UC<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    def: UCDef<I, OPI0, OPI1>;
    auth: UCAuth | null;
    inputFields: UCInputField<any>[];
    constructor(appManifest: AppManifest, def: UCDef<I, OPI0, OPI1>, auth: UCAuth | null);
    clear(): void;
    clearSensitiveInputFields(): void;
    fill(input: Partial<I>): this;
    hasInputField(key: UCFieldKey): boolean;
    hasMediaInInput(): boolean;
    hasOutputParts(): boolean;
    inputField<T extends DataType>(key: keyof NonNullable<I>): UCInputField<T>;
    inputFieldsForForm(): UCInputField<any>[];
    inputFieldsOrdered(): UCInputField<any>[];
    inputFieldsInsensitive(): UCInputField<any>[];
    inputFieldsSensitive(): UCInputField<any>[];
    needsInputFilling(): boolean;
    needsOutputDisplay(): boolean;
    operatesOnAggregate(): boolean;
    rVal0<T extends DataType>(key: keyof I): ReturnType<typeof rVal0<T>>;
    reqVal0<T extends DataType>(key: keyof I): ReturnType<typeof reqVal0<T>>;
    rValArr<T extends DataType>(key: keyof I): ReturnType<typeof rValArr<T>>;
    validate(): [UCInputField<any> | null, Validation] | null;
}
