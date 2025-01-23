var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppI18nChecker_1;
import { injectable } from 'inversify';
const ERR_I18N_MISMATCH = () => 'The languageCodes in app manifest must match with the keys in i18n';
const ERR_I18N_KEY_INVALID = (key) => `The i18n key '${key}' must respect the i18n key pattern`;
const ERR_I18N_LABEL_NO_DOT = (key) => `The i18n key '${key}' is a label, thus should not ends with a dot`;
let AppI18nChecker = class AppI18nChecker {
    static { AppI18nChecker_1 = this; }
    static I18N_KEY_PATTERN = /(dt_([A-Z][A-Za-z0-9]+)_([A-Za-z0-9]+)_(desc|label))|(err_([A-Za-z_]+))|(uc_([A-Z][A-Za-z0-9]+)_(client_confirm_(cancel|confirm|message|title)|desc|label|i_submit_(changing|idle|initializing|submitting)|op_(0|1)_(empty|label)))|(ucif_([a-z]([A-Za-z0-9]+)?)_(desc|label))|(ucof_([a-z]([A-Za-z0-9]+)?)_(desc|label))|(validation_([a-z]+)_([A-Z][A-Za-z0-9]+))/;
    output;
    constructor() {
        this.output = { errors: [] };
    }
    async exec({ appI18n, appManifest }) {
        this.makeSureLanguagesAreConsistent(appI18n, appManifest);
        this.makeSureKeysAndLabelsAreValid(appI18n);
        return this.output;
    }
    makeSureLanguagesAreConsistent(appI18n, appManifest) {
        const inManifest = appManifest.languageCodes;
        const inI18n = Object.keys(appI18n);
        if (inManifest.join() !== inI18n.join()) {
            this.output.errors.push(ERR_I18N_MISMATCH());
        }
    }
    makeSureKeysAndLabelsAreValid(i18n) {
        for (const [_, translations] of Object.entries(i18n)) {
            for (const [key, translation] of Object.entries(translations)) {
                const matches = key.match(AppI18nChecker_1.I18N_KEY_PATTERN);
                if (!matches) {
                    this.output.errors.push(ERR_I18N_KEY_INVALID(key));
                }
                if (key.endsWith('_label') && translation.endsWith('.')) {
                    this.output.errors.push(ERR_I18N_LABEL_NO_DOT(key));
                }
            }
        }
    }
};
AppI18nChecker = AppI18nChecker_1 = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], AppI18nChecker);
export { AppI18nChecker };
