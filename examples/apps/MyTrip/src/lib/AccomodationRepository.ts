import type {
    Amount,
    CompanyName,
    CountryISO3166Alpha2,
    FreeTextShort,
    Initializable,
    UIntQuantity,
    UUID,
} from '../../../../../dist/esm/index.js';
import type { AccomodationRate } from './TAccomodationRate.js';

export interface AccomodationRepositorySearchI {
    adultsCount: UIntQuantity;
    countryCode: CountryISO3166Alpha2;
}

export interface AccomodationRepositorySearchO {
    items: {
        id: UUID;
        name: CompanyName;
        nightPrice: Amount;
        rate: AccomodationRate;
        title: FreeTextShort;
    }[];
}

export interface AccomodationRepository extends Initializable {
    search(
        input: AccomodationRepositorySearchI,
    ): Promise<AccomodationRepositorySearchO>;
}
