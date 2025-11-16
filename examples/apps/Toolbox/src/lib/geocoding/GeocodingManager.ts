import type { Address, Geolocation } from '../../../../../../dist/esm/index.js';

export interface GeocodingManager {
    geocode(address: Address): Promise<Geolocation | null>;
}
