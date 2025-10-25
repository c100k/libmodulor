import {
    type Amount,
    type CurrencyISO4217,
    TAmount,
    type TName,
} from 'libmodulor';

export type AssetPrice = Amount;

export class TAssetPrice extends TAmount {
    constructor(currencyCode: CurrencyISO4217) {
        super(currencyCode, undefined, 3);
        this.setSemanticsPredicate((v) => {
            if (v < 0) {
                return { variant: 'danger' };
            }
            if (v > 0) {
                return { variant: 'success' };
            }
            return {};
        });
    }

    public override tName(): TName {
        return 'AssetPrice';
    }

    public override example(): AssetPrice {
        return 262.74;
    }

    public override fmt(ifNullOrUndefined?: string | undefined): string {
        if (typeof this.raw !== 'number') {
            return super.fmt(ifNullOrUndefined);
        }

        return new Intl.NumberFormat(undefined, {
            currency: this.currencyCode,
            maximumFractionDigits: this.getDecimalsCount(),
            signDisplay: 'always',
            style: 'currency',
        }).format(this.raw);
    }
}
