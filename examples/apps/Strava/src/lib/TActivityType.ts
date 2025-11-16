import { TString } from '../../../../../dist/esm/index.js';

export type ActivityType = 'Run' | 'Trail';

export class TActivityType extends TString<ActivityType, 'ActivityType'> {
    // In real life, we would use OPTIONS for this, but it's just for testing constraints format
    public static readonly FORMAT: RegExp = /^(Run|Trail)$/;

    constructor() {
        super({
            format: { f: 'ActivityType', regexp: TActivityType.FORMAT },
        });
    }

    public override example(): ActivityType {
        return 'Trail';
    }
}
