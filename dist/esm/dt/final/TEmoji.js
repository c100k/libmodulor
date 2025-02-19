import { TString } from '../base/TString.js';
// It is too difficult to validate safely an emoji
// See : https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript
// Plus it does not bring much
// At first, I used maxLength/minLength == 1 but it was naive. Composite ones' length is greater than 1.
export class TEmoji extends TString {
    tName() {
        return 'Emoji';
    }
    example() {
        return '🚀';
    }
}
