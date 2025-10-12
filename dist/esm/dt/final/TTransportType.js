import { TString } from '../base/TString.js';
export class TTransportType extends TString {
    constructor() {
        super();
        this.setOptions([
            { label: 'standard', value: 'standard' },
            { label: 'stream', value: 'stream' },
        ]);
    }
    tName() {
        return 'TransportType';
    }
    example() {
        return 'standard';
    }
}
