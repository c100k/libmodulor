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
var CSPDirectivesBuilder_1;
import { inject, injectable } from 'inversify';
let CSPDirectivesBuilder = class CSPDirectivesBuilder {
    static { CSPDirectivesBuilder_1 = this; }
    environmentManager;
    logger;
    settingsManager;
    static DEFAULT_SRC = 'default-src';
    static IMG_SRC = 'img-src';
    static SCRIPT_SRC = 'script-src';
    constructor(environmentManager, logger, settingsManager) {
        this.environmentManager = environmentManager;
        this.logger = logger;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_csp_default_src: this.settingsManager.get()('server_csp_default_src'),
            server_csp_img_src: this.settingsManager.get()('server_csp_img_src'),
            server_csp_script_src: this.settingsManager.get()('server_csp_script_src'),
        };
    }
    exec({ defaultDirectives }) {
        this.logger.info('Default CSP directives', defaultDirectives);
        const directives = { ...defaultDirectives };
        if (!this.environmentManager.isProd()) {
            this.logger.warn('Disabling upgrade-insecure-requests');
            directives['upgrade-insecure-requests'] = null;
            this.logger.warn('Enabling unsafe-eval');
            directives[CSPDirectivesBuilder_1.SCRIPT_SRC]?.push("'unsafe-eval'");
            this.logger.warn('Enabling unsafe-inline');
            directives[CSPDirectivesBuilder_1.SCRIPT_SRC]?.push("'unsafe-inline'");
        }
        this.logger.info('Adding specific CSP directives');
        directives[CSPDirectivesBuilder_1.DEFAULT_SRC]?.push(...this.s().server_csp_default_src);
        directives[CSPDirectivesBuilder_1.IMG_SRC]?.push(...this.s().server_csp_img_src);
        directives[CSPDirectivesBuilder_1.SCRIPT_SRC]?.push(...this.s().server_csp_script_src);
        this.logger.info('Final CSP directives', directives);
        return {
            directives,
        };
    }
};
CSPDirectivesBuilder = CSPDirectivesBuilder_1 = __decorate([
    injectable(),
    __param(0, inject('EnvironmentManager')),
    __param(1, inject('Logger')),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CSPDirectivesBuilder);
export { CSPDirectivesBuilder };
