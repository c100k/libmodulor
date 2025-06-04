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
import { decodeJwt, decodeProtectedHeader, importPKCS8, importSPKI, jwtVerify, SignJWT, } from 'jose';
import { JWSSignatureVerificationFailed } from 'jose/errors';
import { UnauthorizedError } from '../../error/index.js';
import { assertIsDefined } from '../../utils/index.js';
let JoseJWTManager = class JoseJWTManager {
    clockManager;
    settingsManager;
    constructor(clockManager, settingsManager) {
        this.clockManager = clockManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            jwt_manager_algorithm: this.settingsManager.get()('jwt_manager_algorithm'),
            jwt_manager_audience: this.settingsManager.get()('jwt_manager_audience'),
            jwt_manager_expires_in: this.settingsManager.get()('jwt_manager_expires_in'),
            jwt_manager_issuer: this.settingsManager.get()('jwt_manager_issuer'),
            jwt_manager_key_id: this.settingsManager.get()('jwt_manager_key_id'),
            jwt_manager_secret: this.settingsManager.get()('jwt_manager_secret'),
            jwt_manager_subject: this.settingsManager.get()('jwt_manager_subject'),
        };
    }
    async decode(value, opts) {
        const { alg } = decodeProtectedHeader(value);
        assertIsDefined(alg, 'alg');
        const secret = opts?.secret || this.s().jwt_manager_secret;
        try {
            if (alg.startsWith('HS')) {
                return (await jwtVerify(value, new TextEncoder().encode(secret))).payload;
            }
            if (alg.startsWith('RS')) {
                assertIsDefined(opts?.spki, 'opts.spki');
                const publicKey = await importSPKI(opts?.spki, alg);
                return (await jwtVerify(value, publicKey)).payload;
            }
        }
        catch (err) {
            if (err instanceof JWSSignatureVerificationFailed) {
                throw new UnauthorizedError();
            }
        }
        throw new Error(`Unsupported alg ${alg}`);
    }
    async encode(payload, opts) {
        const alg = opts?.alg ?? this.s().jwt_manager_algorithm;
        const aud = opts?.aud ?? this.s().jwt_manager_audience;
        const exp = opts?.exp ?? this.s().jwt_manager_expires_in;
        const iss = opts?.iss ?? this.s().jwt_manager_issuer;
        const kid = opts?.kid ?? this.s().jwt_manager_key_id;
        const secret = opts?.secret ?? this.s().jwt_manager_secret;
        const subject = opts?.sub ?? this.s().jwt_manager_subject;
        const typ = 'JWT';
        const header = { alg, typ };
        if (kid) {
            header.kid = kid;
        }
        const builder = new SignJWT(payload)
            .setAudience(aud)
            .setExpirationTime(exp)
            .setIssuer(iss)
            .setIssuedAt()
            .setProtectedHeader(header);
        if (subject) {
            builder.setSubject(subject);
        }
        if (alg.startsWith('HS')) {
            return builder.sign(new TextEncoder().encode(secret));
        }
        if (alg.startsWith('RS')) {
            return builder.sign(await importPKCS8(secret, alg));
        }
        throw new Error(`Unsupported alg ${alg}`);
    }
    async isUsable(value) {
        const decoded = decodeJwt(value);
        if (!(decoded &&
            typeof decoded === 'object' &&
            'exp' in decoded &&
            typeof decoded.exp === 'number')) {
            return false;
        }
        const now = this.clockManager.time();
        const { exp } = decoded;
        const isExpired = exp < now;
        if (isExpired) {
            return false;
        }
        return true;
    }
};
JoseJWTManager = __decorate([
    injectable(),
    __param(0, inject('ClockManager')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], JoseJWTManager);
export { JoseJWTManager };
