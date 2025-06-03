import { Container, inject, injectable } from 'inversify';
import {
    type AggregateOPI0,
    AggregateOutputDef,
    type AppI18n,
    type AppManifest,
    CONTAINER_OPTS,
    type Email,
    EverybodyUCPolicy,
    type I18nManager,
    type PersonFirstname,
    type PersonLastname,
    type ProductI18n,
    type ProductManifest,
    TEmail,
    TPersonFirstname,
    TPersonLastname,
    UC,
    type UCAuth,
    type UCDataStore,
    type UCDef,
    type UCInput,
    UCInputFieldChangeOperator,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCManager,
    UCOutputBuilder,
    type UCOutputOrNothing,
    type UCOutputReader,
    WordingManager,
    bindCommon,
    bindProduct,
    fmtBold,
    fmtPadEndFor,
} from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';
import { bindNodeCore } from 'libmodulor/node';

console.log('Declaring the App');
const appManifest: AppManifest = {
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
const appI18n: AppI18n = {
    en: {
        ucif_email_label: 'Your email address',
        ucif_firstname_label: 'Your wonderful firstname',
        ucif_lastname_label: 'Your awesome lastname',
        ucof_id_label: 'Your registration #',
    },
};

console.log('Declaring the UseCase');
interface RegisterInput extends UCInput {
    email: UCInputFieldValue<Email>;
    firstname: UCInputFieldValue<PersonFirstname>;
    lastname: UCInputFieldValue<PersonLastname>;
}

interface RegisterOPI0 extends AggregateOPI0 {}

@injectable()
class RegisterClientMain implements UCMain<RegisterInput, RegisterOPI0> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<RegisterInput, RegisterOPI0>): Promise<
        UCOutputOrNothing<RegisterOPI0>
    > {
        const { aggregateId } = await this.ucManager.persist(uc);

        return new UCOutputBuilder<RegisterOPI0>()
            .add({
                id: aggregateId,
            })
            .get();
    }
}

const RegisterUCD: UCDef<RegisterInput, RegisterOPI0> = {
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
const productManifest: ProductManifest = {
    appReg: [{ name: 'Event' }],
    name: 'Eventer',
};
const productI18n: ProductI18n = {
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
const i18nManager = container.get<I18nManager>('I18nManager');
await i18nManager.init();

const ucDataStore = container.get<UCDataStore>('UCDataStore');
const ucManager = container.get<UCManager>('UCManager');
const wordingManager = container.get(WordingManager);

console.log('Initializing the UseCase');
const auth: UCAuth | null = null;
const registerUC = new UC(appManifest, RegisterUCD, auth);
let ucor: UCOutputReader<RegisterInput, RegisterOPI0> | undefined = undefined;

try {
    console.log('Submitting the use case empty');
    ucor = await ucManager.execClient(registerUC);
} catch (err) {
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
} catch (err) {
    printErr(err);
}

console.log('Filling a valid email');
registerUC
    .inputField('email')
    .setValue(UCInputFieldChangeOperator.SET, new TEmail().example());

try {
    ucor = await ucManager.execClient(registerUC);
} catch (err) {
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
const firstnameLabel = wordingManager.ucif(
    registerUC.inputField('firstname'),
).label;
const lastname = registerUC.reqVal0('lastname');
const lastnameLabel = wordingManager.ucif(
    registerUC.inputField('lastname'),
).label;
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

function printErr(err: unknown): void {
    if (err instanceof Error) {
        console.log(`❌ Oops : ${err.message}`);
        return;
    }
    console.log('❌ Oops : unknown error');
}

process.exit(0);
