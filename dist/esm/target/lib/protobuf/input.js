import { Field, Type } from 'protobufjs';
import { UC_INPUT_SUFFIX } from '../../../convention.js';
import { ucifRepeatability, } from '../../../uc/index.js';
import { fieldNum } from './field.js';
export function ucInputType(ucd) {
    const { metadata: { name }, io: { i }, } = ucd;
    if (!i) {
        return null;
    }
    const type = new Type(`${name}${UC_INPUT_SUFFIX}`);
    let num = fieldNum();
    for (const f of Object.entries(i.fields)) {
        const key = f[0];
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        const fDef = f[1];
        const { type: fType } = fDef;
        const [isRepeatable] = ucifRepeatability(fDef);
        type.add(new Field(key, num, fType.protobufType(), isRepeatable ? 'repeated' : 'optional'));
        num = fieldNum(num);
    }
    return type;
}
