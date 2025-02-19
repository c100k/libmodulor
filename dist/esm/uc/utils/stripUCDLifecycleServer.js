import { UC_MAIN_SERVER_SUFFIX } from '../../convention.js';
const CORE_SERVER_MAINS = ['IdleServerMain'];
const TOKEN_IMPORT = 'import';
const TOKEN_IMPORT_END = ';';
const TOKEN_LIFECYCLE_SERVER = 'server: {';
const TOKEN_LIFECYCLE_SERVER_END = '},';
const TOKEN_LIFECYCLE_SERVER_REPLACE = 'server: true,';
/**
 * Strip the server part of the UCD
 *
 * To be used by bundlers when building for the web for example, or any other clients (e.g. React Native).
 *
 * WARNING : This implementation is very naive and will have unexpected behaviors when the UCD has a specific shape.
 * For instance, if there is another `server: {` occurence than the lifecycle.server definition, it will be wrongly replaced.
 *
 * TODO : Make this implementation more robust (let's try not to use an AST parser though, to keep things fast and simple).
 *
 * @param source
 * @returns
 */
export function stripUCDLifecycleServer(source) {
    const occurrences = [
        ...source.matchAll(new RegExp(UC_MAIN_SERVER_SUFFIX, 'g')),
    ];
    const count = occurrences.length;
    const toReplace = [];
    let occIdx = 0;
    for (const occ of occurrences) {
        if (count === 3 && occIdx === 1) {
            // Skip the 2nd occurrence as it is part of the import of the 1st (Rrrrh very hacky...)
            occIdx += 1;
            continue;
        }
        const toRep = { end: 0, start: 0, str: '' };
        let cursor = occ.index;
        let expr = '';
        while (!expr.startsWith(TOKEN_IMPORT) &&
            !expr.startsWith(TOKEN_LIFECYCLE_SERVER)) {
            expr = `${source[cursor]}${expr}`;
            cursor -= 1;
        }
        toRep.start = cursor;
        cursor = occ.index;
        while (!expr.endsWith(TOKEN_IMPORT_END) &&
            !expr.endsWith(TOKEN_LIFECYCLE_SERVER_END)) {
            expr = `${expr}${source[cursor]}`;
            cursor += 1;
        }
        toRep.end = cursor;
        toRep.str = source.substring(toRep.start, toRep.end).trim();
        toReplace.push(toRep);
        occIdx += 1;
    }
    // Flip the items to replace in order to remove the usage before the imports
    // This is related to the edge case of IdleServerMain that we remove from the imports list,
    // while for specific ServerMain, we remove the entire import instruction.
    toReplace.reverse();
    let cleaned = source;
    for (const { str } of toReplace) {
        if (str.startsWith(TOKEN_LIFECYCLE_SERVER)) {
            cleaned = cleaned.replaceAll(str, TOKEN_LIFECYCLE_SERVER_REPLACE);
            continue;
        }
        if (str.startsWith(TOKEN_IMPORT)) {
            for (const coreServerMain of CORE_SERVER_MAINS) {
                if (str.includes(coreServerMain)) {
                    cleaned = cleaned.replace(new RegExp(`${coreServerMain},?`), '');
                }
            }
            cleaned = cleaned.replaceAll(str, '');
        }
    }
    if (cleaned.includes(UC_MAIN_SERVER_SUFFIX)) {
        throw new Error(`Stripping UCD server lifecycle did not complete successfully. The output still contains references to ${UC_MAIN_SERVER_SUFFIX} : ${cleaned}`);
    }
    return cleaned;
}
