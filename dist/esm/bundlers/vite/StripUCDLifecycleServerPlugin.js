import { UC_DEF_FILE_NAME_SUFFIX } from '../../convention.js';
import { stripUCDLifecycleServer } from '../../uc/index.js';
export const StripUCDLifecycleServerPlugin = {
    // Why enforce ?
    // Otherwise Rollup parses the file and strips trailing commas.
    // We need them to strip correctly (although the implementation will be made more robust).
    enforce: 'pre',
    name: 'strip-ucd-lifecycle-server',
    transform: (src, id) => {
        if (id.match(new RegExp(`${UC_DEF_FILE_NAME_SUFFIX}$`)) === null) {
            return;
        }
        const code = stripUCDLifecycleServer(src);
        return {
            code,
        };
    },
};
