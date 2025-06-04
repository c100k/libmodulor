import { type DataType } from '../../dt/index.js';
import type { StringKeys } from '../../utils/index.js';
import type { UCDef } from '../def.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UCOutput, UCOutputPartIdx, UCOutputPartKey } from '../output.js';
import type { UCOutputPart, UCOutputPartDef } from '../output-part.js';
import type { UC } from '../UC.js';
import { UCOutputField } from '../UCOutputField.js';
export interface UCOutputReaderPart<OPI extends UCOPIBase> {
    fields: UCOutputField<OPI, any>[];
    idx: UCOutputPartIdx;
    items: UCOutputPart<OPI>['items'];
    key: UCOutputPartKey<OPI>;
    layout: UCOutputPartDef<OPI>['layout'];
    pagination: Pick<UCOutputPart<OPI>, 'total'> & {
        label: UCOutputReaderPaginationLabel;
    };
    related?: UCOutputPartDef<OPI>['related'];
}
export type UCOutputReaderPaginationLabel = `${number}/${number}`;
export declare class UCOutputReader<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    private _ucd;
    private _output;
    private _part0;
    private _part1;
    constructor(_ucd: UCDef<I, OPI0, OPI1>, _output: UCOutput<OPI0, OPI1> | undefined);
    field0<T extends DataType>(key: StringKeys<NonNullable<OPI0>>): UCOutputField<NonNullable<OPI0>, T>;
    item00(): Pick<UCOutputReaderPart<NonNullable<OPI0>>, 'layout'> & {
        item: UCOutputReaderPart<NonNullable<OPI0>>['items'][0];
    };
    canItem00(): boolean;
    isEmpty(): boolean;
    part<OPI extends UCOPIBase>(idx: UCOutputPartIdx): UCOutputReaderPart<OPI> | undefined;
    part0(): UCOutputReaderPart<NonNullable<OPI0>>;
    part1(): UCOutputReaderPart<NonNullable<OPI1>> | undefined;
    parts(): [UCOutputReaderPart<NonNullable<OPI0>>] | [
        UCOutputReaderPart<NonNullable<OPI0>>,
        UCOutputReaderPart<NonNullable<OPI1>>
    ];
    output(): UCOutput<OPI0, OPI1> | undefined;
    ucd(): UC<I, OPI0, OPI1>['def'];
}
