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
var UCExecutor_1;
import { inject, injectable } from 'inversify';
import { rInput, UCBuilder, } from '../../uc/index.js';
const ERR_CLIENT_EXPECTED_UCOR = (name) => `${name} client is expected to return an ucor`;
const ERR_CLIENT_EXPECTED_OUTPUT = (name) => `${name} client is expected to return an output but returned nothing`;
const ERR_CLIENT_UNEXPECTED_OUTPUT = (name) => `${name} client is expected to return nothing but returned an output`;
let UCExecutor = class UCExecutor {
    static { UCExecutor_1 = this; }
    cryptoManager;
    ucBuilder;
    ucManager;
    static HASH_ALG = 'sha256';
    static HASH_BTT_ENCODING = 'hex';
    static HASH_SEP = '-';
    constructor(cryptoManager, ucBuilder, ucManager) {
        this.cryptoManager = cryptoManager;
        this.ucBuilder = ucBuilder;
        this.ucManager = ucManager;
    }
    async exec({ appManifest, auth, authName, inputFiller, inputFillerName, ucd, }) {
        const out = {
            args: {
                auth,
                authName,
                inputFiller,
                inputFillerName,
            },
            err: null,
            hash: null,
            io: {
                i: null,
                o: null,
            },
        };
        // In a typical scenario, client calls the server so only the client actually needs to be called here
        await this.execClient(appManifest, ucd, out);
        return {
            out,
        };
    }
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async execClient(appManifest, ucd, out) {
        const { lifecycle: { client }, } = ucd;
        if (!client) {
            return;
        }
        const { args } = out;
        const { auth, inputFiller } = args;
        const { metadata: { name }, } = ucd;
        const uc = this.ucBuilder.exec({
            appManifest,
            auth,
            def: ucd,
        });
        inputFiller(uc);
        const input = rInput(uc);
        out.io.i = input;
        out.hash = this.cryptoManager.hash(UCExecutor_1.HASH_ALG, [name, JSON.stringify(args), JSON.stringify(input)].join(UCExecutor_1.HASH_SEP), UCExecutor_1.HASH_BTT_ENCODING);
        try {
            let ucor;
            const transportType = ucd.ext?.http?.transportType ?? 'standard';
            switch (transportType) {
                case 'standard':
                    ucor = await this.ucManager.execClient(uc);
                    break;
                case 'stream': {
                    try {
                        let abort;
                        await this.ucManager.execClient(uc, {
                            registerAbort: (func) => {
                                abort = func;
                            },
                            stream: {
                                onClose: async () => { },
                                onData: async (ucor2) => {
                                    if (!ucor) {
                                        ucor = ucor2;
                                        abort();
                                    }
                                },
                                onDone: async () => { },
                            },
                        });
                    }
                    catch (err) {
                        if (err.name !== 'AbortError') {
                            throw err;
                        }
                    }
                    break;
                }
                default:
                    transportType;
            }
            if (!ucor) {
                throw new Error(ERR_CLIENT_EXPECTED_UCOR(name));
            }
            const output = ucor.output();
            if (uc.hasOutputParts() && !output) {
                throw new Error(ERR_CLIENT_EXPECTED_OUTPUT(name));
            }
            if (!uc.hasOutputParts() && output) {
                throw new Error(ERR_CLIENT_UNEXPECTED_OUTPUT(name));
            }
            out.io.o = output ?? null;
        }
        catch (err) {
            out.err = err;
        }
        finally {
            this.derandomizeInput(out.io.i);
        }
    }
    derandomizeInput(input) {
        for (const [k, v] of Object.entries(input)) {
            if (Array.isArray(v)) {
                v.forEach((vv, idx) => {
                    if (vv instanceof File) {
                        // @ts-expect-error
                        input[k][idx] = this.derandomizeInputFile(vv);
                    }
                });
            }
            else if (v instanceof File) {
                // @ts-expect-error
                input[k] = this.derandomizeInputFile(v);
            }
        }
    }
    derandomizeInputFile(file) {
        // Since TypeScript 5.8, a new `lastModified` field has appeared in `File.state: FileState {}` when snapshotting.
        // The problem is that this value is a timestamp that changes everytime we execute the tests.
        // Creating a `specificAssertion` just for that would be cumbersome.
        // Hence the transform of the `File` into a deterministic `Object` for easy snapshotting.
        return {
            name: file.name,
            size: file.size,
            type: file.type,
        };
    }
};
UCExecutor = UCExecutor_1 = __decorate([
    injectable(),
    __param(0, inject('CryptoManager')),
    __param(1, inject(UCBuilder)),
    __param(2, inject('UCManager')),
    __metadata("design:paramtypes", [Object, UCBuilder, Object])
], UCExecutor);
export { UCExecutor };
