export function ucfIsMandatory(cardinality) {
    const min = cardinality?.min;
    if (min === undefined) {
        return true;
    }
    return min > 0;
}
export function ucfRepeatability(cardinality) {
    const max = cardinality?.max;
    if (max === undefined) {
        return [false, 0];
    }
    return [max > 1, max];
}
