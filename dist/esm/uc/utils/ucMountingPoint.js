import { formatFQUCName, parseFQUCName } from '../metadata.js';
export function ucMountingPoint(uc) {
    return formatFQUCName(uc.appManifest.name, uc.def.metadata.name);
}
export function parseUCMountingPoint(value) {
    return parseFQUCName(value);
}
