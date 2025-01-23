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
import { WordingManager } from '../../i18n/index.js';
let StaticUCClientConfirmManager = class StaticUCClientConfirmManager {
    logger;
    wordingManager;
    constructor(logger, wordingManager) {
        this.logger = logger;
        this.wordingManager = wordingManager;
    }
    async exec(ucd) {
        const config = this.wordingManager.ucClientConfirm(ucd);
        this.logger.debug('Simulate client confirm (always true)', { config });
        return true;
    }
};
StaticUCClientConfirmManager = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __param(1, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, WordingManager])
], StaticUCClientConfirmManager);
export { StaticUCClientConfirmManager };
