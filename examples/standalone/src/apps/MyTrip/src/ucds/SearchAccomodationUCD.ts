import { inject, injectable } from 'inversify';
import {
    type Amount,
    type CompanyName,
    type CountryISO3166Alpha2,
    type DateISO8601,
    EverybodyUCPolicy,
    type I18nManager,
    IllegalArgumentError,
    type Logger,
    TCountryISO3166Alpha2,
    TDateISO8601,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOutputOrNothing,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

export interface SearchAccomodationInput extends UCInput {
    country: UCInputFieldValue<CountryISO3166Alpha2>;
    from: UCInputFieldValue<DateISO8601>;
    to: UCInputFieldValue<DateISO8601>;
}

export interface SearchAccomodationOPI0 extends UCOPIBase {
    name: CompanyName;
    price: Amount;
}

@injectable()
class SearchAccomodationClientMain
    implements UCMain<SearchAccomodationInput, SearchAccomodationOPI0>
{
    constructor(
        @inject('I18nManager') private i18nManager: I18nManager,
        @inject('Logger') private logger: Logger,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<SearchAccomodationInput, SearchAccomodationOPI0>): Promise<
        UCOutputOrNothing<SearchAccomodationOPI0>
    > {
        const country = uc.reqVal0<CountryISO3166Alpha2>('country');
        const from = uc.reqVal0<DateISO8601>('from');
        const to = uc.reqVal0<DateISO8601>('to');

        this.logger.info('Searching', { country, from, to });

        if (from.localeCompare(to) >= 0) {
            throw new IllegalArgumentError(
                this.i18nManager.t('err_from_before_to'),
            );
        }
    }
}

export const SearchAccomodationUCD: UCDef<
    SearchAccomodationInput,
    SearchAccomodationOPI0
> = {
    io: {
        i: {
            fields: {
                country: {
                    type: new TCountryISO3166Alpha2(),
                },
                from: {
                    type: new TDateISO8601().setExamples(['2022-07-14']),
                },
                to: {
                    type: new TDateISO8601().setExamples(['2022-07-20']),
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
