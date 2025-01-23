import type { UIntQuantity, UUID } from '../../dt/index.js';
import type { UCOPIBase } from '../opi.js';
import type { UCOutput } from '../output.js';
export declare class UCOutputBuilder<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    private output;
    add(item: NonNullable<OPI0>): this;
    addAll(items: NonNullable<OPI0>[]): this;
    addAll1(items: NonNullable<OPI1>[]): this;
    add1(item: NonNullable<OPI1>): this;
    count(): UIntQuantity;
    count1(): UIntQuantity;
    has(predicate: (item: OPI0) => boolean): boolean;
    get(): UCOutput<OPI0, OPI1>;
    remove(predicate: (item: OPI0) => boolean): this;
    sort(sorter: (a: OPI0, b: OPI0) => number): this;
    update(id: UUID, apply: (item: OPI0) => void): this;
    private init1IfNecessary;
}
