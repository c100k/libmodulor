import { IllegalArgumentError } from '../../error/index.js';
export function assertIsDefined(value, key) {
    if (isBlank(value)) {
        throw new IllegalArgumentError(`${key} is required`);
    }
}
export function isBlank(value) {
    return (value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (Array.isArray(value) && value.length === 0));
}
export function range(n) {
    const items = [];
    for (let i = 0; i < n; i++) {
        items.push(i);
    }
    return items;
}
export function sample(items) {
    if (items.length === 0) {
        return null;
    }
    return items[Math.floor(Math.random() * items.length)] ?? null;
}
export function tupleOf(val, n) {
    const items = [];
    for (let i = 0; i < n; i++) {
        items.push(val);
    }
    return items;
}
