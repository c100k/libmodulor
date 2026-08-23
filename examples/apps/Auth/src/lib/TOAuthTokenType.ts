import { TString } from '../../../../../dist/esm/index.js';

export type OAuthTokenType = 'Bearer';

export class TOAuthTokenType extends TString<OAuthTokenType> {
    constructor() {
        super();
        this.setOptions([{ label: 'Bearer', value: 'Bearer' }]);
    }

    public override example(): OAuthTokenType {
        return 'Bearer';
    }
}
