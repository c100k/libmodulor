import { useState } from 'react';
import { UC, } from '../../../uc/index.js';
/**
 * This hook provides utilities to init a use case and perform actions on it in a React way
 * @param appManifest
 * @param def
 * @param auth
 * @param opts
 * @returns
 */
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
    /**
     * Get a new `UC` based on the initial one
     * @param i
     * @returns
     */
    const clone = (i) => new UC(uc.appManifest, uc.def, uc.auth).fill(i);
    /**
     * Get a new `UC` based on the "common" settings of the initial one (i.e. `auth`)
     * @param ucd
     * @returns
     */
    const divert = (siblingUCD) => new UC(uc.appManifest, siblingUCD, uc.auth);
    /**
     * Update the existing `uc` in an immutable way to trigger components re-rendering
     * @param i
     */
    const refill = (i) => {
        setUC(new UC(uc.appManifest, uc.def, uc.auth).fill(i));
    };
    return [uc, { clone, divert, refill }];
}
