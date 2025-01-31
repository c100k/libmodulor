import { type TName, TString, type TStringConstraints } from 'libmodulor';

export type ISIN = Capitalize<string>;

export class TISIN extends TString<ISIN, 'ISIN'> {
    public static readonly FORMAT: RegExp = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;

    constructor(constraints?: TStringConstraints) {
        super({
            ...constraints,
            format: { f: 'ISIN', regexp: TISIN.FORMAT },
        });
    }

    public override tName(): TName {
        return 'ISIN';
    }

    public override example(): ISIN {
        return 'US02079K3059';
    }
}
