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
var CommandExecutor_1;
import { inject, injectable } from 'inversify';
import { WordingManager } from '../../../i18n/index.js';
import { FSManagerItemInfoType, } from '../../../std/index.js';
import { UCInputFieldChangeOperator, ucifMustBeFilledManually, } from '../../../uc/index.js';
import { print, printError } from './renderer.js';
let CommandExecutor = class CommandExecutor {
    static { CommandExecutor_1 = this; }
    fsManager;
    i18nManager;
    promptManager;
    ucManager;
    wordingManager;
    static DEFAULT_VERSION = '0.0.0';
    static VERSION_FILE_NAME = 'package.json';
    static VERSION_FETCH_MAX_TRIES = 10;
    static VERSION_FETCH_START_PATH = import.meta.dirname;
    constructor(fsManager, i18nManager, promptManager, ucManager, wordingManager) {
        this.fsManager = fsManager;
        this.i18nManager = i18nManager;
        this.promptManager = promptManager;
        this.ucManager = ucManager;
        this.wordingManager = wordingManager;
    }
    async exec({ uc }) {
        try {
            await this.promptForSensitiveFields(uc);
            const confirmed = await this.ucManager.confirmClient(uc);
            if (!confirmed) {
                return;
            }
            const ucor = await this.ucManager.execClient(uc);
            const output = ucor.output();
            if (output) {
                print(JSON.stringify(output));
            }
        }
        catch (err) {
            printError(err);
        }
    }
    fieldsForFlags(uc) {
        return uc.inputFieldsInsensitive();
    }
    async version() {
        let i = 0;
        let currentPath = CommandExecutor_1.VERSION_FETCH_START_PATH;
        let file = undefined;
        while (i < CommandExecutor_1.VERSION_FETCH_MAX_TRIES && !file) {
            const items = await this.fsManager.ls(currentPath, {
                withFullPath: true,
            });
            file = items.find((i) => i.type === FSManagerItemInfoType.FILE &&
                i.path.endsWith(CommandExecutor_1.VERSION_FILE_NAME));
            i += 1;
            currentPath = this.fsManager.path(currentPath, '..');
        }
        if (!file) {
            return CommandExecutor_1.DEFAULT_VERSION;
        }
        const contents = await this.fsManager.cat(file.path);
        try {
            const { version } = JSON.parse(contents);
            return version;
        }
        catch (err) {
            return CommandExecutor_1.DEFAULT_VERSION;
        }
    }
    async promptForSensitiveFields(uc) {
        const fields = uc
            .inputFieldsSensitive()
            .filter((f) => ucifMustBeFilledManually(f.def, { noContext: true }));
        for (const f of fields) {
            const { desc, label } = this.wordingManager.ucif(f);
            const help = desc ? ` (${desc})` : '';
            const invite = `${label}${help}`;
            await this.promptManager.prompt(invite, {
                validate: async (v) => {
                    f.setValue(UCInputFieldChangeOperator.SET, v);
                    const validation = f.validate();
                    const violation = validation.get();
                    if (!violation) {
                        return true;
                    }
                    const [key, expected] = violation;
                    const message = this.i18nManager.t(key, {
                        vars: { expected },
                    });
                    printError(message);
                    return false;
                },
            });
        }
    }
};
CommandExecutor = CommandExecutor_1 = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('I18nManager')),
    __param(2, inject('PromptManager')),
    __param(3, inject('UCManager')),
    __param(4, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, WordingManager])
], CommandExecutor);
export { CommandExecutor };
