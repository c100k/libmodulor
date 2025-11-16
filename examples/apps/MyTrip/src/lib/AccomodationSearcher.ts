import { inject, injectable } from 'inversify';

import type {
    CountryISO3166Alpha2,
    DateISO8601,
    UIntQuantity,
    Worker,
} from '../../../../../dist/esm/index.js';
import type { SearchAccomodationOPI0 } from '../ucds/SearchAccomodationUCD.js';
import type { AccomodationRepository } from './AccomodationRepository.js';

interface Input {
    adultsCount: UIntQuantity;
    childrenCount: UIntQuantity;
    countryCode: CountryISO3166Alpha2;
    from: DateISO8601;
    roomsCount: UIntQuantity;
    to: DateISO8601;
}

type Output = SearchAccomodationOPI0[];

@injectable()
export class AccomodationSearcher implements Worker<Input, Promise<Output>> {
    constructor(
        @inject('AccomodationRepository')
        private accomodationRepository: AccomodationRepository,
    ) {}

    public async exec({ adultsCount, countryCode }: Input): Promise<Output> {
        // TODO : Compute as "to - from"
        const nightsCount = 10;

        const res = await this.accomodationRepository.search({
            adultsCount,
            countryCode,
        });

        return res.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: nightsCount * item.nightPrice,
            rate: item.rate,
            title: item.title,
        }));
    }
}
