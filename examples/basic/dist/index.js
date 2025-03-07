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
import { AggregateOutputDef, CONTAINER_OPTS, EverybodyUCPolicy, TEmail, TPersonFirstname, TPersonLastname, UC, UCInputFieldChangeOperator, UCOutputBuilder, WordingManager, bindCommon, bindProduct, fmtBold, fmtPadEndFor, } from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';
import { bindNodeCore } from 'libmodulor/node';
console.log('Declaring the App');
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
const appI18n = {
    en: {
        ucif_email_label: 'Your email address',
        ucif_firstname_label: 'Your wonderful firstname',
        ucif_lastname_label: 'Your awesome lastname',
        ucof_id_label: 'Your registration #',
    },
};
console.log('Declaring the UseCase');
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
console.log('Declaring the Product');
const productManifest = {
    appReg: [{ name: 'Event' }],
    name: 'Eventer',
};
const productI18n = {
    en: {
        ...I18nEN,
        ...appI18n.en,
    },
};
console.log('Declaring the Target');
const container = new Container(CONTAINER_OPTS);
bindCommon(container);
bindNodeCore(container);
bindProduct(container, productManifest, productI18n);
console.log('Initializing i18n');
const i18nManager = container.get('I18nManager');
await i18nManager.init();
const ucDataStore = container.get('UCDataStore');
const ucManager = container.get('UCManager');
const wordingManager = container.resolve(WordingManager);
console.log('Initializing the UseCase');
const auth = null;
const registerUC = new UC(appManifest, RegisterUCD, auth);
let ucor = undefined;
try {
    console.log('Submitting the use case empty');
    ucor = await ucManager.execClient(registerUC);
}
catch (err) {
    printErr(err);
}
console.log('Filling all the fields correctly except the email (invalid)');
registerUC.fill({
    email: 'xxx',
    firstname: new TPersonFirstname().example(),
    lastname: new TPersonLastname().example(),
});
try {
    ucor = await ucManager.execClient(registerUC);
}
catch (err) {
    printErr(err);
}
console.log('Filling a valid email');
registerUC
    .inputField('email')
    .setValue(UCInputFieldChangeOperator.SET, new TEmail().example());
try {
    ucor = await ucManager.execClient(registerUC);
}
catch (err) {
    printErr(err);
    process.exit(1);
}
console.log('✅ Use case executed successfully');
console.log('💾 Persisted record in InMemoryUCDataStore');
const { records } = await ucDataStore.read();
for (const record of records) {
    console.log(record);
}
const email = registerUC.reqVal0('email');
const emailLabel = wordingManager.ucif(registerUC.inputField('email')).label;
const firstname = registerUC.reqVal0('firstname');
const firstnameLabel = wordingManager.ucif(registerUC.inputField('firstname')).label;
const lastname = registerUC.reqVal0('lastname');
const lastnameLabel = wordingManager.ucif(registerUC.inputField('lastname')).label;
const { id } = ucor.item00().item;
const idLabel = wordingManager.ucof('id').label;
const padEnd = fmtPadEndFor([
    emailLabel,
    firstnameLabel,
    lastnameLabel,
    idLabel,
]);
console.log(fmtBold('📓 Summary with fields from I18n/WordingManager'));
const summary = [
    `${idLabel.padEnd(padEnd)} : ${id}`,
    `${emailLabel.padEnd(padEnd)} : ${email}`,
    `${firstnameLabel.padEnd(padEnd)} : ${firstname}`,
    `${lastnameLabel.padEnd(padEnd)} : ${lastname}`,
];
for (const line of summary) {
    console.log(line);
}
function printErr(err) {
    console.log(`❌ Oops : ${err.message}`);
}
process.exit(0);
