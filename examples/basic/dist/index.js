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
import { Container, inject, injectable } from 'inversify';
import { AggregateOutputDef, CONTAINER_OPTS, EverybodyUCPolicy, TEmail, TPersonFirstname, TPersonLastname, UC, UCOutputBuilder, bindCommon, } from 'libmodulor';
import { bindNodeCore } from 'libmodulor/node';
const appManifest = {
    languageCodes: ['en'],
    name: 'Event',
    ucReg: {
        Register: {
            action: 'Create',
            icon: 'user',
            name: 'Register',
        },
    },
};
let RegisterClientMain = class RegisterClientMain {
    ucManager;
    constructor(ucManager) {
        this.ucManager = ucManager;
    }
    async exec({ uc, }) {
        const { aggregateId } = await this.ucManager.persist(uc);
        return new UCOutputBuilder()
            .add({
            id: aggregateId,
        })
            .get();
    }
};
RegisterClientMain = __decorate([
    injectable(),
    __param(0, inject('UCManager')),
    __metadata("design:paramtypes", [Object])
], RegisterClientMain);
const RegisterUCD = {
    io: {
        i: {
            fields: {
                email: {
                    type: new TEmail(),
                },
                firstname: {
                    type: new TPersonFirstname(),
                },
                lastname: {
                    type: new TPersonLastname(),
                },
            },
        },
        o: AggregateOutputDef,
    },
    lifecycle: {
        client: {
            main: RegisterClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: {
        action: 'Create',
        icon: 'user',
        name: 'Register',
    },
};
const auth = null;
const registerUC = new UC(appManifest, RegisterUCD, auth);
const container = new Container(CONTAINER_OPTS);
bindCommon(container);
bindNodeCore(container);
const ucManager = container.get('UCManager');
const res = await ucManager.execClient(registerUC);
console.log(res);
