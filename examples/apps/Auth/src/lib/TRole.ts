import {
    type TName,
    TString,
    type UCAuthRole,
} from '../../../../../dist/esm/index.js';

export type Role = Extract<UCAuthRole, 'admin' | 'regular'>;

export class TRole extends TString<Role, 'Role'> {
    constructor() {
        super();
        this.setOptions([
            { label: 'admin', value: 'admin' },
            { label: 'regular', value: 'regular' },
        ]);
    }

    public override tName(): TName {
        return 'Role';
    }

    public override example(): Role {
        return 'admin';
    }
}
