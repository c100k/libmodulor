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
import { parseArgs } from 'node:util';
import { inject, injectable } from 'inversify';
import { TBoolean } from '../../dt/index.js';
import { WordingManager } from '../../i18n/index.js';
import { ProductUCsLoader } from '../../product/index.js';
import { ucifRepeatability, ucMountingPoint, } from '../../uc/index.js';
import { CommandExecutor } from '../lib/cli/CommandExecutor.js';
import { print } from '../lib/cli/renderer.js';
import { showHelp } from './commands.js';
let NodeCoreCLIManager = class NodeCoreCLIManager {
    commandExecutor;
    productUCsLoader;
    wordingManager;
    constructor(commandExecutor, productUCsLoader, wordingManager) {
        this.commandExecutor = commandExecutor;
        this.productUCsLoader = productUCsLoader;
        this.wordingManager = wordingManager;
    }
    async handleCommand({ appsRootPath, srcImporter, }) {
        const command = process.argv[2] ?? '';
        const ucs = await this.productUCsLoader.exec({
            appsRootPath,
            srcImporter,
        });
        const commands = new Map(ucs.map((uc) => [
            uc.def.ext?.cmd?.mountAt ?? ucMountingPoint(uc),
            uc,
        ]));
        if (!command || !command.trim() || command === '--help') {
            showHelp(ucs, this.wordingManager);
        }
        else if (command === '--version') {
            print(await this.commandExecutor.version());
        }
        else {
            const uc = commands.get(command);
            if (!uc) {
                showHelp(ucs, this.wordingManager);
                return;
            }
            const args = parseArgs(this.parseArgsConfig(uc));
            uc.fill(args.values);
            await this.commandExecutor.exec({ uc });
        }
    }
    parseArgsConfig(uc) {
        const config = {
            allowPositionals: true, // For the command name
            strict: true,
        };
        if (uc.inputFields.length === 0) {
            return config;
        }
        config.options = {};
        for (const f of this.commandExecutor.fieldsForFlags(uc)) {
            const { def } = f;
            let defaultValue = def.type.getDefaultValue();
            if (typeof defaultValue === 'number') {
                defaultValue = defaultValue.toString(); // parseArgs does not accept numbers as default value
            }
            const [isRepeatable, _max] = ucifRepeatability(def);
            const type = def.type instanceof TBoolean ? 'boolean' : 'string';
            config.options[f.key] = {
                default: defaultValue,
                multiple: isRepeatable,
                type,
            };
        }
        return config;
    }
};
NodeCoreCLIManager = __decorate([
    injectable(),
    __param(0, inject(CommandExecutor)),
    __param(1, inject(ProductUCsLoader)),
    __param(2, inject(WordingManager)),
    __metadata("design:paramtypes", [CommandExecutor,
        ProductUCsLoader,
        WordingManager])
], NodeCoreCLIManager);
export { NodeCoreCLIManager };
