import { injectable } from 'inversify';
import { type Address, type Geolocation, TAddress } from 'libmodulor';

import type { GeocodingManager } from './GeocodingManager.js';

@injectable()
export class FakeGeocodingManager implements GeocodingManager {
    public async geocode(address: Address): Promise<Geolocation | null> {
        if (address !== new TAddress().example()) {
            return null;
        }

        return {
            lat: 48.87063,
            lng: 2.316931,
        };
    }
}
