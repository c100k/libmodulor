import { inject, injectable } from 'inversify';

import {
    type Amount,
    type CompanyName,
    type CountryISO3166Alpha2,
    type DateISO8601,
    EverybodyUCPolicy,
    type FreeTextShort,
    type I18nManager,
    IllegalArgumentError,
    TAmount,
    TCompanyName,
    TCountryISO3166Alpha2,
    TDateISO8601,
    TFreeTextShort,
    TUIntQuantity,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOutput,
    UCOutputBuilder,
    type UIntQuantity,
} from '../../../../../dist/esm/index.js';
import { AccomodationSearcher } from '../lib/AccomodationSearcher.js';
import {
    type AccomodationRate,
    TAccomodationRate,
} from '../lib/TAccomodationRate.js';
import { Manifest } from '../manifest.js';

export interface SearchAccomodationInput extends UCInput {
    adultsCount: UCInputFieldValue<UIntQuantity>;
    childrenCount: UCInputFieldValue<UIntQuantity>;
    country: UCInputFieldValue<CountryISO3166Alpha2>;
    from: UCInputFieldValue<DateISO8601>;
    roomsCount: UCInputFieldValue<UIntQuantity>;
    to: UCInputFieldValue<DateISO8601>;
}

export interface SearchAccomodationOPI0 extends UCOPIBase {
    name: CompanyName;
    price: Amount;
    rate: AccomodationRate;
    title: FreeTextShort;
}

@injectable()
class SearchAccomodationClientMain
    implements UCMain<SearchAccomodationInput, SearchAccomodationOPI0>
{
    constructor(
        @inject(AccomodationSearcher)
        private accomodationSearcher: AccomodationSearcher,
        @inject('I18nManager') private i18nManager: I18nManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<SearchAccomodationInput, SearchAccomodationOPI0>): Promise<
        UCOutput<SearchAccomodationOPI0>
    > {
        const adultsCount = uc.reqVal0('adultsCount');
        const childrenCount = uc.reqVal0('childrenCount');
        const country = uc.reqVal0('country');
        const from = uc.reqVal0('from');
        const roomsCount = uc.reqVal0('roomsCount');
        const to = uc.reqVal0('to');

        if (from.localeCompare(to) >= 0) {
            throw new IllegalArgumentError(
                this.i18nManager.t('err_from_before_to'),
            );
        }

        const items = await this.accomodationSearcher.exec({
            adultsCount,
            childrenCount,
            countryCode: country,
            from,
            roomsCount,
            to,
        });

        return new UCOutputBuilder<SearchAccomodationOPI0>()
            .addAll(items)
            .get();
    }
}

export const SearchAccomodationUCD: UCDef<
    SearchAccomodationInput,
    SearchAccomodationOPI0
> = {
    io: {
        i: {
            fields: {
                adultsCount: {
                    type: new TUIntQuantity({
                        max: 32,
                        min: 1,
                    })
                        .setExamples([2])
                        .setInitialValue(2),
                },
                childrenCount: {
                    type: new TUIntQuantity({ max: 19 })
                        .setExamples([0])
                        .setInitialValue(0),
                },
                country: {
                    type: new TCountryISO3166Alpha2()
                        .setExamples(['FR'])
                        .setInitialValue('FR'),
                },
                from: {
                    type: new TDateISO8601().setExamples(['2022-07-14']),
                },
                roomsCount: {
                    type: new TUIntQuantity({ max: 8, min: 1 })
                        .setExamples([1])
                        .setInitialValue(1),
                },
                to: {
                    type: new TDateISO8601().setExamples(['2022-07-20']),
                },
            },
            order: [
                'country',
                'from',
                'to',
                'roomsCount',
                'adultsCount',
                'childrenCount',
            ],
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        name: {
                            type: new TCompanyName(),
                        },
                        price: {
                            type: new TAmount('EUR'),
                        },
                        rate: {
                            type: new TAccomodationRate(),
                        },
                        title: {
                            type: new TFreeTextShort(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: SearchAccomodationClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.SearchAccomodation,
};
