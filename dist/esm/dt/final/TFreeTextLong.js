import { TString } from '../base/TString.js';
export class TFreeTextLong extends TString {
    tName() {
        return 'FreeTextLong';
    }
    example() {
        return "On est jeunes et ambitieux. Parfois vicieux. Faut qu'tu te dises que. Tu peux être le prince de la ville si tu veux (si tu veux). Où tu veux (où tu veux) quand tu veux (quand tu veux).";
    }
    isPotentiallyLong() {
        return true;
    }
}
