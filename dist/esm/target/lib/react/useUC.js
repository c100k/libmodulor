import { useState } from 'react';
import { UC, } from '../../../uc/index.js';
export function useUC(appManifest, def, auth, opts) {
    const [uc, setUC] = useState(() => {
        const { name: appName, ucReg } = appManifest;
        const { name: ucName } = def.metadata;
        if (!Object.keys(ucReg).includes(ucName)) {
            throw new Error(`The use case ${ucName} does not exist in app ${appName}`);
        }
        const v = new UC(appManifest, def, auth);
        if (opts?.fillWith) {
            v.fill(opts?.fillWith);
        }
        return v;
    });
    const clone = (i) => new UC(uc.appManifest, uc.def, uc.auth).fill(i);
    const divert = (siblingUCD) => new UC(uc.appManifest, siblingUCD, uc.auth);
    const refill = (i) => {
        setUC(new UC(uc.appManifest, uc.def, uc.auth).fill(i));
    };
    return [uc, { clone, divert, refill }];
}
