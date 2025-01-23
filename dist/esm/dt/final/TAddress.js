import { TString } from '../base/TString.js';
export class TAddress extends TString {
    tName() {
        return 'Address';
    }
    example() {
        return '55 Rue du Faubourg Saint-Honoré, 75008 Paris';
    }
}
