import { TUInt } from '../base/TUInt.js';
export class TTimestamp extends TUInt {
    tName() {
        return 'Timestamp';
    }
    example() {
        return 1_628_359_209;
    }
}
