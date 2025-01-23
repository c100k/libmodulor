import { TString } from '../base/TString.js';
export class TTime extends TString {
    static FORMAT = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'Time', regexp: TTime.FORMAT },
        });
    }
    tName() {
        return 'Time';
    }
    example() {
        return '10:00';
    }
    htmlInputType() {
        return 'time';
    }
    rnInputMode() {
        return 'numeric';
    }
}
