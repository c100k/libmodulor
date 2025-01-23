import { TBoolean, TEmbeddedObject, TInt, TNumber, } from '../../dt/index.js';
import { ucifRepeatability } from '../../uc/index.js';
export function propertyType(def) {
    const { cardinality, type } = def;
    let primitive = 'string';
    if (type instanceof TBoolean) {
        primitive = 'boolean';
    }
    else if (type instanceof TInt) {
        primitive = 'integer';
    }
    else if (type instanceof TNumber) {
        primitive = 'number';
    }
    else if (type instanceof TEmbeddedObject) {
        primitive = 'object';
    }
    const [isRepeatable] = ucifRepeatability(def);
    const maxItems = cardinality?.max;
    const minItems = cardinality?.min;
    return isRepeatable
        ? { items: { type: primitive }, maxItems, minItems, type: 'array' }
        : { type: primitive };
}
export function resError(err) {
    return {
        isError: true,
        content: [
            {
                text: err.message,
                type: 'text',
            },
        ],
    };
}
export function resObj(obj) {
    return {
        content: [
            {
                text: JSON.stringify(obj),
                type: 'text',
            },
        ],
    };
}
