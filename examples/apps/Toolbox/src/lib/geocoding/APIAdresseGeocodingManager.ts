import { inject, injectable } from 'inversify';

import type {
    Address,
    ErrorMessage,
    Geolocation,
    HTTPAPICaller,
    HTTPStatusNumber,
    URL,
} from '../../../../../../dist/esm/index.js';
import type { GeocodingManager } from './GeocodingManager.js';

// https://adresse.data.gouv.fr/api-doc/adresse
// Limite d'usage
// Pour garantir un usage équitable de ce service très sollicité, une limite d'usage est appliquée. Elle est de 50 appels/IP/seconde.
// Lorsqu'une IP sollicite l' API au-delà de la limite d'usage fixée :
// Une erreur HTML 429 (Too Many Requests) est envoyée en réponse à toute requête
// Ce blocage intervient pour une durée de 5 secondes; La durée du blocage est indiquée dans un header "retry-after", avec une durée initialisée à 5 secondes et qui décroît à partir du moment où la sur-sollicitation cesse.

type Req = {
    q: Address;
};
type ResBad = { code: HTTPStatusNumber; message: ErrorMessage };
type ResGood = {
    features: {
        geometry: {
            coordinates: [Geolocation['lng'], Geolocation['lat']];
            type: 'Point';
        };
        type: 'Feature';
    }[];
};
type O = {
    location: Geolocation | null;
};

@injectable()
export class APIAdresseGeocodingManager implements GeocodingManager {
    public static BASE_URL: URL = 'https://api-adresse.data.gouv.fr';

    constructor(
        @inject('HTTPAPICaller') private httpAPICaller: HTTPAPICaller,
    ) {}

    public async geocode(address: Address): Promise<Geolocation | null> {
        const response = await this.httpAPICaller.exec<
            undefined,
            Req,
            ResBad,
            ResGood,
            O
        >({
            errBuilder: async (error) => error.message,
            method: 'GET',
            outputBuilder: async (res) => {
                const o: O = { location: null };
                if (res.features.length === 0) {
                    return o;
                }

                // biome-ignore lint/style/noNonNullAssertion: checked above
                const [lng, lat] = res.features[0]!.geometry.coordinates;
                o.location = {
                    lat,
                    lng,
                };

                return o;
            },
            req: {
                builder: async () => ({
                    q: address,
                }),
                envelope: 'query-params',
            },
            urlBuilder: async () =>
                `${APIAdresseGeocodingManager.BASE_URL}/search`,
        });

        return response.location;
    }
}
