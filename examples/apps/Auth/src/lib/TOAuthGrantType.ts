import { TString } from '../../../../../dist/esm/index.js';

export type OAuthGrantType = 'authorization_code';

export class TOAuthGrantType extends TString<OAuthGrantType> {
    constructor() {
        super();
        this.setOptions([
            { label: 'authorization_code', value: 'authorization_code' },
        ]);
    }

    public override example(): OAuthGrantType {
        return 'authorization_code';
    }
}
