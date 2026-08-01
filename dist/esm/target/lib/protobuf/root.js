import { Root } from 'protobufjs';
import { UC_CONTRACT_DEFAULT_PREFIX_WITH_DOTS_PARTS } from '../../../uc/index.js';
import { valuesIn } from '../../../utils/index.js';
import { ucOutputPartPaginationType } from './output.js';
export function root() {
    const r = new Root();
    for (const p of UC_CONTRACT_DEFAULT_PREFIX_WITH_DOTS_PARTS) {
        r.define(p);
    }
    r.add(ucOutputPartPaginationType());
    return r;
}
export function addAllTo(root, serviceTypes) {
    for (const type of valuesIn(serviceTypes)) {
        if (!type || root.get(type.name)) {
            continue;
        }
        root.add(type);
    }
}
