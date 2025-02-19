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
import { capitalize } from '../../../utils/index.js';
let BasicAuthenticationChecker = class BasicAuthenticationChecker {
    bufferManager;
    logger;
    settingsManager;
    constructor(bufferManager, logger, settingsManager) {
        this.bufferManager = bufferManager;
        this.logger = logger;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_basic_auth_entries: this.settingsManager.get()('server_basic_auth_entries'),
        };
    }
    async exec({ rawValue }) {
        const basicAuth = rawValue?.replace('Basic ', '');
        if (!basicAuth) {
            return null;
        }
        const [username, password] = this.bufferManager
            .decodeBase64(basicAuth)
            .split(':');
        this.logger.trace('Credentials', { password, username });
        if (!username || !password) {
            return null;
        }
        const realPassword = this.s().server_basic_auth_entries[username];
        if (!realPassword) {
            return null;
        }
        const passwordsMatch = password === realPassword;
        if (!passwordsMatch) {
            return null;
        }
        // TODO : Improve this by fetching data from a data store for example
        return {
            organization: {
                id: '',
            },
            role: username === 'admin' ? 'admin' : 'regular',
            user: {
                firstname: capitalize(username),
                id: '',
                initials: '',
            },
        };
    }
};
BasicAuthenticationChecker = __decorate([
    injectable(),
    __param(0, inject('BufferManager')),
    __param(1, inject('Logger')),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object])
], BasicAuthenticationChecker);
export { BasicAuthenticationChecker };
