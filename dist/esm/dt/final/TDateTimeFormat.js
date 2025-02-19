import { TString } from '../base/TString.js';
// TODO : Validate this model with some simple heuristics. Do not make it too complicated, it's not really worth it.
export class TDateTimeFormat extends TString {
    tName() {
        return 'DateTimeFormat';
    }
    example() {
        return 'ccc LLL dd';
    }
}
