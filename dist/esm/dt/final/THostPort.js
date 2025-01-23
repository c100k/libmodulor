import { TUInt } from '../base/TUInt.js';
export class THostPort extends TUInt {
    constructor(constraints) {
        super({
            ...constraints,
            min: 0,
        });
    }
    tName() {
        return 'HostPort';
    }
    example() {
        return 443;
    }
}
