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
import { Alert } from 'react-native';
import { WordingManager } from '../../i18n/index.js';
let RNUCClientConfirmManager = class RNUCClientConfirmManager {
    wordingManager;
    constructor(wordingManager) {
        this.wordingManager = wordingManager;
    }
    async exec(ucd) {
        const { cancel, confirm, message, title } = this.wordingManager.ucClientConfirm(ucd);
        return new Promise((resolve) => {
            Alert.alert(title, message ?? undefined, [
                {
                    onPress: () => resolve(true),
                    style: 'destructive',
                    text: confirm,
                },
                {
                    onPress: () => resolve(false),
                    style: 'cancel',
                    text: cancel,
                },
            ]);
        });
    }
};
RNUCClientConfirmManager = __decorate([
    injectable(),
    __param(0, inject(WordingManager)),
    __metadata("design:paramtypes", [WordingManager])
], RNUCClientConfirmManager);
export { RNUCClientConfirmManager };
