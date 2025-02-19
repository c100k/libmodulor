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
let UCExecChecker = class UCExecChecker {
    productManifest;
    settingsManager;
    ucPolicyProvider;
    constructor(productManifest, settingsManager, ucPolicyProvider) {
        this.productManifest = productManifest;
        this.settingsManager = settingsManager;
        this.ucPolicyProvider = ucPolicyProvider;
    }
    s() {
        return {
            uc_disabled_use_cases: this.settingsManager.get()('uc_disabled_use_cases'),
        };
    }
    async exec({ lifecycle, uc }) {
        const output = {
            allowed: false,
        };
        const { lifecycle: { client, server }, metadata, } = uc.def;
        const disabled = this.s().uc_disabled_use_cases.includes(metadata.name);
        if (disabled) {
            return output;
        }
        switch (lifecycle) {
            case 'client': {
                if (!client) {
                    return output;
                }
                const { appManifest } = uc;
                const app = this.productManifest.appReg.find((app) => appManifest.name === app.name);
                if (!app) {
                    throw new Error(`Could not find app named ${appManifest.name}`);
                }
                const ucds = app.ucds?.exclude ?? [];
                output.allowed = !ucds.includes(metadata.name);
                if (output.allowed) {
                    const policy = (await this.ucPolicyProvider(client.policy));
                    const { allowed } = await policy.exec({ uc });
                    output.allowed = allowed;
                }
                break;
            }
            case 'server':
                // Nothing specific for the moment as everything is checked in function of authentication
                // @see AuthenticationChecker called in the request lifecycle
                output.allowed = typeof server === 'object';
                break;
            default:
                ((_) => { })(lifecycle);
        }
        return output;
    }
};
UCExecChecker = __decorate([
    injectable(),
    __param(0, inject('ProductManifest')),
    __param(1, inject('SettingsManager')),
    __param(2, inject('Provider<UCPolicy>')),
    __metadata("design:paramtypes", [Object, Object, Function])
], UCExecChecker);
export { UCExecChecker };
