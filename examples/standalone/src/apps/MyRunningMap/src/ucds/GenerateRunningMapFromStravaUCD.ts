import { inject, injectable } from 'inversify';
import {
    type ApiKey,
    type Color,
    type CryptoManager,
    type ErrorMessage,
    EverybodyUCPolicy,
    type Geolocation,
    type HTTPAPICaller,
    type Logger,
    type NumIndex,
    TApiKey,
    TUIntQuantity,
    TURL,
    type UCDef,
    type UCInput,
    UCInputFieldFillingMode,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOutput,
    UCOutputBuilder,
    type UIntQuantity,
    type URL as URLString,
} from 'libmodulor';

import type { GeospatialManager } from '../lib/geospatial/GeospatialManager.js';
import { Manifest } from '../manifest.js';

export interface GenerateRunningMapFromStravaInput extends UCInput {
    activitiesCount: UCInputFieldValue<UIntQuantity>;
    mapboxAccessToken: UCInputFieldValue<ApiKey>;
    stravaAccessToken: UCInputFieldValue<ApiKey>;
}

export interface GenerateRunningMapFromStravaOPI0 extends UCOPIBase {
    mapURL: URLString;
    mapURLCharsCount: UIntQuantity;
}

@injectable()
export class GenerateRunningMapFromStravaClientMain
    implements
        UCMain<
            GenerateRunningMapFromStravaInput,
            GenerateRunningMapFromStravaOPI0
        >
{
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('GeospatialManager')
        private geospatialManager: GeospatialManager,
        @inject('HTTPAPICaller') private httpAPICaller: HTTPAPICaller,
        @inject('Logger') private logger: Logger,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<
        GenerateRunningMapFromStravaInput,
        GenerateRunningMapFromStravaOPI0
    >): Promise<UCOutput<GenerateRunningMapFromStravaOPI0>> {
        const activitiesCount = uc.reqVal0<UIntQuantity>('activitiesCount');
        const mapboxAccessToken = uc.reqVal0<ApiKey>('mapboxAccessToken');
        const stravaAccessToken = uc.reqVal0<ApiKey>('stravaAccessToken');

        // https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
        let items: {
            distance: number;
            end_latlng: [Geolocation['lat'], Geolocation['lng']];
            // in meters
            id: number;
            location_city: string;
            location_country: string;
            location_state: string;
            name: string;
            start_latlng: [] | [Geolocation['lat'], Geolocation['lng']];
            type: 'Ride' | 'Run';
        }[] = [];
        let pageItems: typeof items = [];
        let page: NumIndex = 1;
        const perPage: UIntQuantity = Math.min(200, activitiesCount); // This is the max (default is 30)
        do {
            this.logger.debug('Fetching', { page });

            pageItems = await this.httpAPICaller.exec<
                undefined,
                { page: NumIndex; per_page: UIntQuantity },
                { message: ErrorMessage },
                typeof items,
                typeof items
            >({
                authorizationHeader: {
                    prefix: 'Bearer',
                    value: stravaAccessToken,
                },
                errBuilder: async (error) => error.message,
                method: 'GET',
                req: {
                    builder: async () => ({
                        page,
                        per_page: perPage,
                    }),
                    envelope: 'query-params',
                },
                urlBuilder: async () =>
                    'https://www.strava.com/api/v3/athlete/activities',
            });

            this.logger.debug('Fetched items', { count: pageItems.length });

            items = items.concat(pageItems);
            page += 1;
        } while (pageItems.length > 0 && items.length < activitiesCount);

        // https://docs.mapbox.com/api/maps/static-images/
        // https://api.mapbox.com/styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{bbox}|{auto}/{width}x{height}{@2x}
        const baseURL: URLString = 'https://api.mapbox.com/styles/v1/mapbox';
        const style: 'dark-v10' | 'light-v10' = 'dark-v10';
        const type = 'static';
        const position = 'auto';
        const pinPrefix = 'pin';
        const pinSize: 'l' | 's' = 'l';
        const pinColor: Color = '555555';
        const width: UIntQuantity = 1280; // px
        const height: UIntQuantity = 800; // px
        const padding: UIntQuantity = 100; // px
        const attribution: boolean = false;

        // Remove the closest points to reduce the size of the URL
        // TODO : Skip compaction if there are not a lot of points
        const compactedItems: typeof items = [];
        const compactionDistance: number = 50; // km
        items.forEach((item) => {
            // I don't like the complexity of this computation, let's find a better solution later (it's O<sup>2</sup> if I'm right)
            const closeItem = compactedItems.find(
                (cI) =>
                    cI.start_latlng.length === 2 &&
                    item.start_latlng.length === 2 &&
                    this.geospatialManager.distanceBetween(
                        { lat: cI.start_latlng[0], lng: cI.start_latlng[1] },
                        {
                            lat: item.start_latlng[0],
                            lng: item.start_latlng[1],
                        },
                    ).v < compactionDistance,
            );
            if (!closeItem) {
                compactedItems.push(item);
            }
        });

        const pins = compactedItems
            .filter(({ start_latlng }) => start_latlng.length === 2)
            .map(
                ({ start_latlng }) =>
                    `${pinPrefix}-${pinSize}+${pinColor}(${start_latlng
                        .reverse()
                        .join(',')})`,
            )
            .join(',');

        const mapURL = new URL(
            [
                baseURL,
                style,
                type,
                pins,
                position,
                [width, height].join('x'),
            ].join('/'),
        );
        mapURL.searchParams.append('access_token', mapboxAccessToken);
        mapURL.searchParams.append('attribution', attribution.toString());
        mapURL.searchParams.append('padding', padding.toString());

        return new UCOutputBuilder<GenerateRunningMapFromStravaOPI0>()
            .add({
                id: this.cryptoManager.randomUUID(),
                mapURL: mapURL.toString() as URLString,
                mapURLCharsCount: mapURL.toString().length,
            })
            .get();
    }
}

export const GenerateRunningMapFromStravaUCD: UCDef<
    GenerateRunningMapFromStravaInput,
    GenerateRunningMapFromStravaOPI0
> = {
    io: {
        i: {
            fields: {
                activitiesCount: {
                    type: new TUIntQuantity({ max: 10_000, min: 1 }),
                },
                mapboxAccessToken: {
                    type: new TApiKey(),
                },
                stravaAccessToken: {
                    fillingMode: UCInputFieldFillingMode.AUTO_PRE,
                    type: new TApiKey(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        mapURL: {
                            type: new TURL(),
                        },
                        mapURLCharsCount: {
                            type: new TUIntQuantity(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: GenerateRunningMapFromStravaClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.GenerateRunningMapFromStrava,
};
