import { UC_DEF_SUFFIX } from '../../convention.js';
export function isFileEligible(fileName, exts) {
    if (!fileName) {
        return false;
    }
    for (const ext of exts) {
        if (fileName.endsWith(`${UC_DEF_SUFFIX}.${ext}`)) {
            return true;
        }
    }
    return false;
}
export function assertTransformedCorrectly(transformed, fileName) {
    const match = transformed.match(/server: (.*)ServerMain/g);
    if (match !== null) {
        // biome-ignore lint/suspicious/noConsole: we want it
        console.warn(transformed);
        throw new Error(`[WARNING] The following file might not have been transformed correctly : ${fileName} (see transformed above)`);
    }
}
