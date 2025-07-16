import type { Address, Geolocation } from 'libmodulor';

export interface GeocodingManager {
    geocode(address: Address): Promise<Geolocation | null>;
}
