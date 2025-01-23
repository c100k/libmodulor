import { isCapitalized } from '../utils/index.js';
const ERR_INVALID_FQ_UC_NAME = (value) => `Invalid fully qualified use case name : ${value}`;
export const FQ_UC_NAME_SEPARATOR = '_';
export function formatFQUCName(appName, ucName) {
    return [appName, ucName].join(FQ_UC_NAME_SEPARATOR);
}
export function parseFQUCName(value) {
    const elements = value.split(FQ_UC_NAME_SEPARATOR);
    if (elements.length !== 2) {
        throw new Error(ERR_INVALID_FQ_UC_NAME(value));
    }
    const [appName, ucName] = elements;
    if (!appName ||
        !isCapitalized(appName) ||
        !ucName ||
        !isCapitalized(ucName)) {
        throw new Error(ERR_INVALID_FQ_UC_NAME(value));
    }
    return [appName, ucName];
}
