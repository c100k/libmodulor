import { TString } from '../base/TString.js';
export class TColorRGBA extends TString {
    static FORMAT = /^#([0-9a-f]{2}){4}$/i;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'ColorRGBA', regexp: TColorRGBA.FORMAT },
        });
    }
    tName() {
        return 'ColorRGBA';
    }
    example() {
        return '#000000ff';
    }
    htmlInputType() {
        return 'color';
    }
}
