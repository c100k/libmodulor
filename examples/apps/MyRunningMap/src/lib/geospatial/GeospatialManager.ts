import type { Geolocation } from '../../../../../../dist/esm/index.js';

export interface GeospatialManagerDistance {
    u: 'km';
    v: number;
}

export interface GeospatialManager {
    distanceBetween(
        p1: Geolocation,
        p2: Geolocation,
    ): GeospatialManagerDistance;
}
