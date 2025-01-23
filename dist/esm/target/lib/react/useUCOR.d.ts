import type { UCInput, UCOPIBase, UCOutputReader, UCOutputReaderPart } from '../../../uc/index.js';
type AppendFunc<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (ucor: UCOutputReader<any, OPI0, OPI1>) => void;
type RemoveFunc<OPI extends UCOPIBase> = (item: OPI) => void;
type UpdateFunc<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (ucor: UCOutputReader<any, OPI0, OPI1>) => void;
export declare function useUCOR<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucor: UCOutputReader<I, OPI0, OPI1>): [
    UCOutputReaderPart<NonNullable<OPI0>> | undefined,
    UCOutputReaderPart<NonNullable<OPI1>> | undefined,
    {
        append0: AppendFunc<OPI0, OPI1>;
        append1: AppendFunc<OPI0, OPI1>;
        remove0: RemoveFunc<NonNullable<OPI0>>;
        remove1: RemoveFunc<NonNullable<OPI1>>;
        update0: UpdateFunc<OPI0, OPI1>;
        update1: UpdateFunc<OPI0, OPI1>;
    }
];
export {};
