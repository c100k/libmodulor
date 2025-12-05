import { Container, inject, injectable } from 'inversify';

import { I18nEN } from '../../../dist/esm/i18n/locales/en.js';
import { I18nFR } from '../../../dist/esm/i18n/locales/fr.js';
import {
    type AggregateOPI0,
    type Amount,
    type AppI18n,
    type AppManifest,
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type Email,
    type ErrorMessage,
    EverybodyUCPolicy,
    fmtPadEndFor,
    type I18nLanguageCode,
    type I18nManager,
    type PersonFirstname,
    type PersonLastname,
    type ProductI18n,
    type ProductManifest,
    TAmount,
    TEmail,
    type TName,
    TPersonFirstname,
    TPersonLastname,
    TUInt,
    UC,
    type UCAuth,
    type UCDataStore,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
    type UCOutputReader,
    type UInt,
    WordingManager,
} from '../../../dist/esm/index.js';
import { bindNodeCore } from '../../../dist/esm/index.node.js';

//#region Declaring

printSection('Declaring');

print('Declaring a specific DataType');
type TicketNumber = UInt;
class TTicketNumber extends TUInt<TicketNumber> {
    constructor() {
        super({ max: 100, min: 0 });
    }

    public override tName(): TName {
        return 'TicketNumber';
    }
}

print('Declaring the App');
const appManifest = {
    languageCodes: ['en', 'fr'],
    name: 'Event',
    ucReg: {
        Register: {
            action: 'Create',
            icon: 'user',
            name: 'Register',
        },
    },
} satisfies AppManifest;
const appI18n: AppI18n = {
    en: {
        ucif_email_label: 'Your email address',
        ucif_firstname_label: 'Your firstname',
        ucif_lastname_label: 'Your lastname',
        ucof_id_label: 'Your registration #',
        ucof_ticketNumber_label: 'Your ticket #',
    },
    fr: {
        ucif_email_label: 'Votre adresse email',
        ucif_firstname_label: 'Votre prénom',
        ucif_lastname_label: 'Votre nom',
        ucof_id_label: "Votre # d'inscription",
        ucof_ticketNumber_label: 'Votre # de ticket',
    },
};

print('Declaring the UseCase');
interface RegisterInput extends UCInput {
    email: UCInputFieldValue<Email>;
    firstname: UCInputFieldValue<PersonFirstname>;
    lastname: UCInputFieldValue<PersonLastname>;
}

interface RegisterOPI0 extends AggregateOPI0 {
    amount: Amount;
    ticketNumber: TicketNumber;
}

@injectable()
class RegisterClientMain implements UCMain<RegisterInput, RegisterOPI0> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<RegisterInput, RegisterOPI0>): Promise<
        UCOutput<RegisterOPI0>
    > {
        const { aggregateId } = await this.ucManager.persist(uc);

        const amount: Amount = 99.99; // Should come from some catalog in a real application
        const ticketNumber: TicketNumber = 1; // Should come from a safely auto-generated sequence in a real application

        return new UCOutputBuilder<RegisterOPI0>()
            .add({
                amount,
                id: aggregateId,
                ticketNumber,
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
        o: {
            parts: {
                _0: {
                    fields: {
                        amount: {
                            type: new TAmount('EUR'),
                        },
                        ticketNumber: {
                            type: new TTicketNumber(),
                        },
                    },
                    order: ['ticketNumber', 'amount', 'id'],
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: RegisterClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: appManifest.ucReg.Register,
};

print('Declaring the Product');
const productManifest: ProductManifest = {
    appReg: [{ name: 'Event' }],
    name: 'Eventer',
};
const productI18n: ProductI18n = {
    en: {
        ...I18nEN,
        ...appI18n.en,
    },
    fr: {
        ...I18nFR,
        ...appI18n.fr,
    },
};

print('Declaring the Target');
const container = new Container(CONTAINER_OPTS);

bindCommon(container);
bindNodeCore(container);
bindProduct(container, productManifest, productI18n);

//#endregion

//#region Initializing

printSection('Initializing');

print('Initializing i18n');
const i18nManager = container.get<I18nManager>('I18nManager');
await i18nManager.init();

print('Initializing dependency injected managers');
const ucDataStore = container.get<UCDataStore>('UCDataStore');
const ucManager = container.get<UCManager>('UCManager');
const wordingManager = container.get(WordingManager);

print('Initializing the UseCase');
const auth: UCAuth | null = null;
const registerUC = new UC(appManifest, RegisterUCD, auth);

//#endregion

//#region Playing with the use case

for await (const lang of appManifest.languageCodes) {
    registerUC.clear();
    await i18nManager.changeLang(lang as I18nLanguageCode);

    printSection(`Playing with the use case in '${lang}'`);

    for (const f of registerUC.inputFieldsOrdered()) {
        const label = wordingManager.ucif(
            registerUC.inputField(f.key as keyof RegisterInput),
        ).label;
        print(`${label} : _`);
    }

    print('\nLeaving input fields blank');
    let ucor = await execUC();

    print(
        '\nFilling all the fields correctly except the email, filled with an invalid value',
    );
    registerUC.fill({
        email: 'this is not a valid email',
        firstname: new TPersonFirstname().example(),
        lastname: new TPersonLastname().example(),
    });
    ucor = await execUC();

    print('\nFilling a valid email');
    registerUC.inputField('email').fillWithExample();
    ucor = await execUC();

    if (!ucor) {
        printErr('Expected an ucor from the UC exec');
        process.exit(1);
    }

    print('\nResponse with translated labels and formatted values');
    printSummary(ucor);
}

print('\nRecords persisted in InMemoryUCDataStore');
const { records } = await ucDataStore.read();
for (const record of records) {
    print(record);
}

//#endregion

//#region Utilities

async function execUC(): Promise<UCOutputReader<
    RegisterInput,
    RegisterOPI0
> | null> {
    print('Submitting');
    try {
        const res = await ucManager.execClient(registerUC);
        printSuccess('Use case executed successfully');
        return res;
    } catch (err) {
        printErr(err);
        return null;
    }
}

async function printSummary(ucor: UCOutputReader<RegisterInput, RegisterOPI0>) {
    const { fields } = ucor.part0();
    const { item } = ucor.item00();

    const labels: string[] = [];
    const values: string[] = [];
    for (const field of fields) {
        const { def, key } = field;
        labels.push(wordingManager.ucof(key).label);
        values.push(def.type.assign(item[key]).fmt());
    }

    const padEnd = fmtPadEndFor(labels);
    for (let i = 0; i < labels.length; i++) {
        const label = labels[i]?.padEnd(padEnd);
        const value = values[i];
        print(`${label} : ${value}`);
    }
}

function print(message?: unknown, ...optionalParams: unknown[]): void {
    // biome-ignore lint/suspicious/noConsole: we want it
    console.log(message, ...optionalParams);
}

function printErr(err: unknown): void {
    let message: ErrorMessage;
    if (err instanceof Error) {
        message = err.message;
    } else {
        message = 'unknown error';
    }
    // biome-ignore lint/suspicious/noConsole: we want it
    console.error(`❌ ${message}`);
}

function printSection(title: string): void {
    print('\n****************************************************************');
    print(`* ${title}`);
    print('****************************************************************\n');
}

function printSuccess(message: string): void {
    print(`✅ ${message}`);
}

//#endregion

process.exit(0);
