import { inject, injectable } from 'inversify';
import type {
    Amount,
    CompanyName,
    CountryISO3166Alpha2,
    CryptoManager,
    FreeTextShort,
    UIntQuantity,
    UUID,
} from 'libmodulor';

import type {
    AccomodationRepository,
    AccomodationRepositorySearchI,
    AccomodationRepositorySearchO,
} from './AccomodationRepository.js';
import type { AccomodationRate } from './TAccomodationRate.js';

@injectable()
export class InMemoryAccomodationRepository implements AccomodationRepository {
    private data: {
        adultsCount: UIntQuantity;
        countryCode: CountryISO3166Alpha2;
        id: UUID;
        name: CompanyName;
        nightPrice: Amount;
        rate: AccomodationRate;
        title: FreeTextShort;
    }[];

    constructor(@inject('CryptoManager') private cryptoManager: CryptoManager) {
        this.data = [];
    }

    public async init(): Promise<void> {
        this.initCommon();
    }

    public initSync(): void {
        this.initCommon();
    }

    public async search({
        adultsCount,
        countryCode,
    }: AccomodationRepositorySearchI): Promise<AccomodationRepositorySearchO> {
        const items: AccomodationRepositorySearchO['items'] = this.data
            .filter(
                (item) =>
                    item.adultsCount === adultsCount &&
                    item.countryCode === countryCode,
            )
            .map((item) => ({
                id: item.id,
                name: item.name,
                nightPrice: item.nightPrice,
                rate: item.rate,
                title: item.title,
            }));

        return {
            items,
        };
    }

    private initCommon(): void {
        this.data = [
            {
                adultsCount: 2,
                countryCode: 'FR',
                id: this.cryptoManager.randomUUID(),
                name: 'Normandy Deauville',
                nightPrice: 1500.0,
                rate: 9.8,
                title: 'La Suite Présidentielle',
            },
        ];
    }
}
