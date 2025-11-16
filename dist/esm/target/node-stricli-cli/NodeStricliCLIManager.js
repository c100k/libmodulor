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
import { buildApplication, buildCommand, buildRouteMap, run, } from '@stricli/core';
import { inject, injectable } from 'inversify';
import { WordingManager } from '../../i18n/index.js';
import { ProductUCsLoader } from '../../product/index.js';
import { ucifHint, ucifIsMandatory, ucifRepeatability, ucMountingPoint, } from '../../uc/index.js';
import { CommandExecutor } from '../lib/cli/CommandExecutor.js';
let NodeStricliCLIManager = class NodeStricliCLIManager {
    commandExecutor;
    productManifest;
    productUCsLoader;
    wordingManager;
    constructor(commandExecutor, productManifest, productUCsLoader, wordingManager) {
        this.commandExecutor = commandExecutor;
        this.productManifest = productManifest;
        this.productUCsLoader = productUCsLoader;
        this.wordingManager = wordingManager;
    }
    async handleCommand({ appsRootPath, srcImporter, }) {
        const ucs = await this.productUCsLoader.exec({
            appsRootPath,
            srcImporter,
        });
        const routes = {};
        for (const uc of ucs) {
            const mountingPoint = uc.def.ext?.cmd?.mountAt ?? ucMountingPoint(uc);
            routes[mountingPoint] = buildCommand({
                docs: {
                    brief: this.wordingManager.uc(uc.def).desc ?? '',
                },
                func: async (flags) => {
                    uc.fill(flags);
                    await this.commandExecutor.exec({ uc });
                },
                parameters: {
                    flags: {},
                },
            });
            const { flags } = routes[mountingPoint].parameters;
            if (!flags) {
                throw new Error('Init the flags first');
            }
            for (const f of this.commandExecutor.fieldsForFlags(uc)) {
                const { def } = f;
                const { desc, label } = this.wordingManager.ucif(f);
                const brief = desc ?? label;
                const defaultValue = def.type.getDefaultValue();
                const [isRepeatable, _max] = ucifRepeatability(def);
                const options = def.type.getOptions();
                const hasOptions = options && options.length > 0;
                const hint = ucifHint(def);
                const common = {
                    brief,
                    default: defaultValue,
                    optional: !ucifIsMandatory(def),
                    placeholder: hint ?? '',
                    variadic: isRepeatable,
                };
                if (hasOptions) {
                    flags[f.key] = {
                        ...common,
                        kind: 'enum',
                        values: options?.map((o) => o.value),
                    };
                }
                else {
                    flags[f.key] = {
                        ...common,
                        kind: 'parsed',
                        parse: (raw) => {
                            def.type.assign(raw);
                            const val = def.type.val();
                            def.type.clear();
                            return val;
                        },
                    };
                }
            }
        }
        const { desc, slogan } = this.wordingManager.p();
        const root = buildRouteMap({
            docs: {
                brief: desc ?? slogan ?? '',
            },
            routes,
        });
        const app = buildApplication(root, {
            name: this.productManifest.name,
            versionInfo: {
                currentVersion: await this.commandExecutor.version(),
            },
        });
        await run(app, process.argv.slice(2), {
            process: process,
        });
    }
};
NodeStricliCLIManager = __decorate([
    injectable(),
    __param(0, inject(CommandExecutor)),
    __param(1, inject('ProductManifest')),
    __param(2, inject(ProductUCsLoader)),
    __param(3, inject(WordingManager)),
    __metadata("design:paramtypes", [CommandExecutor, Object, ProductUCsLoader,
        WordingManager])
], NodeStricliCLIManager);
export { NodeStricliCLIManager };
