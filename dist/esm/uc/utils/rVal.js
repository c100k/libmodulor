import { isBlank } from '../../utils/index.js';
export function rVal0(value, or) {
    if (isBlank(value)) {
        return or ?? null;
    }
    return Array.isArray(value) ? (value[0] ?? null) : value;
}
export function reqVal0(value) {
    const val = rVal0(value);
    if (isBlank(val)) {
        throw new Error('The value is blank');
    }
    return val;
}
export function rValArr(value) {
    if (isBlank(value)) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}
