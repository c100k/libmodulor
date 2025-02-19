import { type ArgsRecord, UC, type UCDef, type UCInput, type UCOPIBase } from '../../../uc/index.js';
type CloneFunc<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (i: Partial<I>) => UC<I, OPI0, OPI1>;
type DivertFunc<II extends UCInput | undefined = undefined, OOPI0 extends UCOPIBase | undefined = undefined, OOPI1 extends UCOPIBase | undefined = undefined> = (siblingUCD: UCDef) => UC<II, OOPI0, OOPI1>;
type RefillFunc<I extends UCInput | undefined = undefined> = (i: Partial<I>) => void;
/**
 * This hook provides utilities to init a use case and perform actions on it in a React way
 * @param appManifest
 * @param def
 * @param auth
 * @param opts
 * @returns
 */
export declare function useUC<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: ArgsRecord<I, OPI0, OPI1>['appManifest'], def: ArgsRecord<I, OPI0, OPI1>['def'], auth: ArgsRecord<I, OPI0, OPI1>['auth'], opts?: {
    fillWith: Partial<I>;
}): [
    UC<I, OPI0, OPI1>,
    {
        clone: CloneFunc<I, OPI0, OPI1>;
        divert: DivertFunc;
        refill: RefillFunc<I>;
    }
];
export {};
