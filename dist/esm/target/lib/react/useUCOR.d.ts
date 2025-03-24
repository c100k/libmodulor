import type { UCInput, UCOPIBase, UCOutputReader, UCOutputReaderPart } from '../../../uc/index.js';
export type AppendFunc<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (ucor: UCOutputReader<any, OPI0, OPI1>) => void;
export type RemoveFunc<OPI extends UCOPIBase> = (item: OPI) => void;
export type UpdateFunc<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (ucor: UCOutputReader<any, OPI0, OPI1>) => void;
/**
 * This hook provides utilities to act on a {@link UCOutputReader} in a React way
 *
 * A usual scenario of this is a "CRUD-like" UI displaying multiple use cases :
 *
 *   - A `List` use case to display a collection of items
 *   - A `Create` use case to add an item
 *   - A `Delete` use case to remove an item
 *   - An `Update` use case to update an item
 *
 * Whenever one of this use case is performed, you can use the `ucor` to act on the main UCOR in an immutable way.
 *
 * @param ucor
 * @returns
 */
export declare function useUCOR<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucor: UCOutputReader<I, OPI0, OPI1>): [
    UCOutputReaderPart<NonNullable<OPI0>>,
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
