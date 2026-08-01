import { Field, Type } from 'protobufjs';
import { UC_OUTPUT_SUFFIX } from '../../../convention.js';
import { UC_OUTPUT_PARTS_FIELD, UC_OUTPUT_PARTS_FIELD_0, UCOPIBaseDefFields, ucofRepeatability, } from '../../../uc/index.js';
import { fieldNum } from './field.js';
const OUTPUT_PAGINATION_TYPE_NAME = 'UCOutputPartPagination';
const OUTPUT_PARTS_TYPE_SUFFIX = 'OutputParts';
export function ucOPIType(name, part) {
    const type = new Type(name);
    const allFields = { ...UCOPIBaseDefFields, ...part.fields };
    let num = fieldNum();
    for (const f of Object.entries(allFields)) {
        const key = f[0];
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        const fDef = f[1];
        const { type: fType } = fDef;
        const [isRepeatable] = ucofRepeatability(fDef);
        type.add(new Field(key, num, fType.protobufType(), isRepeatable ? 'repeated' : 'optional'));
        num = fieldNum(num);
    }
    return type;
}
export function ucOutputPartType(name, opi, pagination) {
    return new Type(name)
        .add(new Field('items', 1, opi.name, 'repeated'))
        .add(new Field('pagination', 2, pagination.name))
        .add(new Field('total', 3, 'uint32'));
}
export function ucOutputPartsType(name, op0) {
    return new Type(`${name}${OUTPUT_PARTS_TYPE_SUFFIX}`).add(new Field(UC_OUTPUT_PARTS_FIELD_0, 1, op0.name));
}
export function ucOutputType(name, outputParts) {
    return new Type(`${name}${UC_OUTPUT_SUFFIX}`).add(new Field(UC_OUTPUT_PARTS_FIELD, 1, outputParts.name));
}
export function ucOutputPartPaginationType() {
    return new Type(OUTPUT_PAGINATION_TYPE_NAME)
        .add(new Field('id', 1, 'string'))
        .add(new Field('limit', 2, 'uint32'))
        .add(new Field('offset', 3, 'uint32'))
        .add(new Field('q', 4, 'string'));
}
