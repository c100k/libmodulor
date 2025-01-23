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
var PromptUCClientConfirmManager_1;
import { inject, injectable } from 'inversify';
import { WordingManager } from '../../i18n/index.js';
let PromptUCClientConfirmManager = class PromptUCClientConfirmManager {
    static { PromptUCClientConfirmManager_1 = this; }
    promptManager;
    wordingManager;
    static N_ANSWERS = ['N', 'n'];
    static Y_ANSWERS = ['Y', 'y'];
    constructor(promptManager, wordingManager) {
        this.promptManager = promptManager;
        this.wordingManager = wordingManager;
    }
    async exec(ucd) {
        const { cancel, confirm, message, title } = this.wordingManager.ucClientConfirm(ucd);
        let invite = title;
        if (message) {
            invite = `${invite} (${message})`;
        }
        invite = `${invite} [${PromptUCClientConfirmManager_1.Y_ANSWERS.join()} = ${confirm} / ${PromptUCClientConfirmManager_1.N_ANSWERS} = ${cancel}]`;
        const res = await this.promptManager.prompt(invite, {
            validate: async (v) => this.isNo(v) || this.isYes(v),
        });
        return this.isYes(res);
    }
    isNo(res) {
        return PromptUCClientConfirmManager_1.N_ANSWERS.includes(res);
    }
    isYes(res) {
        return PromptUCClientConfirmManager_1.Y_ANSWERS.includes(res);
    }
};
PromptUCClientConfirmManager = PromptUCClientConfirmManager_1 = __decorate([
    injectable(),
    __param(0, inject('PromptManager')),
    __param(1, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, WordingManager])
], PromptUCClientConfirmManager);
export { PromptUCClientConfirmManager };
