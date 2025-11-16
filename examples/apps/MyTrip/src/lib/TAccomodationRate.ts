import { TNumber } from '../../../../../dist/esm/index.js';

export type AccomodationRate = number;

export class TAccomodationRate extends TNumber {
    constructor() {
        super({
            max: 10,
            min: 0,
        });
    }
}
