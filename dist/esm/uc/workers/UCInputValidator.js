var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { IllegalArgumentError } from '../../error/index.js';
import { WordingManager } from '../../i18n/index.js';
let UCInputValidator = class UCInputValidator {
    i18nManager;
    wordingManager;
    constructor(i18nManager, wordingManager) {
        this.i18nManager = i18nManager;
        this.wordingManager = wordingManager;
    }
    exec({ uc }) {
        const res = uc.validate();
        if (!res) {
            return;
        }
        const [field, validation] = res;
        const violation = validation.get();
        if (!violation) {
            return;
        }
        const [key, expected] = violation;
        let message = this.i18nManager.t(key, { vars: { expected } });
        if (field) {
            const { label } = this.wordingManager.ucif(field);
            message = `${label} ${message ? message.toLowerCase() : ''}`.trim();
        }
        throw new IllegalArgumentError(message);
    }
};
UCInputValidator = __decorate([
    injectable(),
    __param(0, inject('I18nManager')),
    __param(1, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, WordingManager])
], UCInputValidator);
export { UCInputValidator };
