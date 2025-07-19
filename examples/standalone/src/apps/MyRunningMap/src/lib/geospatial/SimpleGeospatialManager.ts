import { injectable } from 'inversify';
import type { Geolocation, UIntQuantity } from 'libmodulor';

import type {
    GeospatialManager,
    GeospatialManagerDistance,
} from './GeospatialManager.js';

@injectable()
export class SimpleGeospatialManager implements GeospatialManager {
    private static EARTH_RADIUS_IN_KM: UIntQuantity = 6371;

    public distanceBetween(
        p1: Geolocation,
        p2: Geolocation,
    ): GeospatialManagerDistance {
        // Inspired by https://stackoverflow.com/a/27943/1259118

        const latDistance = this.deg2rad(p2.lat - p1.lat);
        const lngDistance = this.deg2rad(p2.lng - p1.lng);

        const a =
            Math.sin(latDistance / 2) ** 2 +
            Math.cos(this.deg2rad(p1.lat)) *
                Math.cos(this.deg2rad(p2.lat)) *
                Math.sin(lngDistance / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return {
            u: 'km',
            v: c * SimpleGeospatialManager.EARTH_RADIUS_IN_KM,
        };
    }

    private deg2rad(deg: Geolocation['lat'] | Geolocation['lng']): number {
        return deg * (Math.PI / 180);
    }
}
