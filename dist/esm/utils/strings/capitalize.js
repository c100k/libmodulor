export function capitalize(value) {
    const firstChar = value[0];
    if (!firstChar) {
        return '';
    }
    return (firstChar.toUpperCase() + value.slice(1));
}
export function isCapitalized(value) {
    const firstChar = value[0];
    if (!firstChar) {
        return true;
    }
    return firstChar === firstChar.toUpperCase();
}
