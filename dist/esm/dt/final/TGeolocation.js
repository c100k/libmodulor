import { TNumber } from '../base/TNumber.js';
import { TObject } from '../base/TObject.js';
export class TGeolocation extends TObject {
    tName() {
        return 'Geolocation';
    }
    example() {
        return { lat: 0.0, lng: 0.0 };
    }
    validate() {
        const validation = super.validate();
        if (!validation.isOK()) {
            return validation;
        }
        const val = this.raw;
        validation.concat(new TNumber({ max: 90, min: -90 }).assign(val.lat).validate());
        validation.concat(new TNumber({ max: 180, min: -180 }).assign(val.lng).validate());
        return validation;
    }
}
