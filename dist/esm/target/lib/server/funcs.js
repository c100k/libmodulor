import { UCExecMode, } from '../../../uc/index.js';
export function shouldMountUC(ucd) {
    const { lifecycle: { server }, } = ucd;
    if (typeof server !== 'object') {
        return 'no ucd.lifecycle.server';
    }
    if (server.execMode === UCExecMode.AUTO) {
        return 'execMode is AUTO';
    }
    return null;
}
