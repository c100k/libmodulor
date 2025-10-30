import { inject, injectable } from 'inversify';
import {
    type Address,
    type CryptoManager,
    EverybodyUCPolicy,
    type Geolocation,
    TAddress,
    TGeolocation,
    TURL,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOPIValue,
    type UCOutput,
    UCOutputBuilder,
    type URL,
} from 'libmodulor';

import type { GeocodingManager } from '../lib/geocoding/GeocodingManager.js';
import { Manifest } from '../manifest.js';

export interface GeocodeAddressInput extends UCInput {
    address: UCInputFieldValue<Address>;
}

export interface GeocodeAddressOPI0 extends UCOPIBase {
    geolocation: UCOPIValue<Geolocation>;
    googleMapsURL: UCOPIValue<URL>;
}

@injectable()
class GeocodeAddressClientMain
    implements UCMain<GeocodeAddressInput, GeocodeAddressOPI0>
{
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('GeocodingManager') private geocodingManager: GeocodingManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<GeocodeAddressInput, GeocodeAddressOPI0>): Promise<
        UCOutput<GeocodeAddressOPI0>
    > {
        const address = uc.reqVal0('address');

        const geolocation = await this.geocodingManager.geocode(address);
        let googleMapsURL: GeocodeAddressOPI0['googleMapsURL'] = null;
        if (geolocation) {
            const { lat, lng } = geolocation;
            googleMapsURL = `https://www.google.com/maps?q=loc:@${lat},${lng}`;
        }

        return new UCOutputBuilder<GeocodeAddressOPI0>()
            .add({
                geolocation,
                googleMapsURL,
                id: this.cryptoManager.randomUUID(),
            })
            .get();
    }
}

export const GeocodeAddressUCD: UCDef<GeocodeAddressInput, GeocodeAddressOPI0> =
    {
        io: {
            i: {
                fields: {
                    address: {
                        type: new TAddress(),
                    },
                },
            },
            o: {
                parts: {
                    _0: {
                        fields: {
                            geolocation: {
                                type: new TGeolocation(),
                            },
                            googleMapsURL: {
                                type: new TURL(),
                            },
                        },
                    },
                },
            },
        },
        lifecycle: {
            client: {
                main: GeocodeAddressClientMain,
                policy: EverybodyUCPolicy,
            },
        },
        metadata: Manifest.ucReg.GeocodeAddress,
    };
