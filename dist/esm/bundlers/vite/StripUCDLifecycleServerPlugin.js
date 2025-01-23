import { UC_DEF_FILE_NAME_SUFFIX } from '../../convention.js';
import { stripUCDLifecycleServer } from '../../uc/index.js';
export const StripUCDLifecycleServerPlugin = {
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
