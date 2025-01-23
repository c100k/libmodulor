import type { Validation } from '../Validation.js';
import type { TName } from '../base/TBase.js';
import { TObject } from '../base/TObject.js';
export type Geolocation = {
    lat: number;
    lng: number;
};
export declare class TGeolocation extends TObject<Geolocation> {
    tName(): TName;
    example(): Geolocation;
    validate(): Validation;
}
