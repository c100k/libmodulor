import { Container, inject, injectable } from 'inversify';
import {
    type AggregateOPI0,
    AggregateOutputDef,
    type AppManifest,
    CONTAINER_OPTS,
    type Email,
    EverybodyUCPolicy,
    type PersonFirstname,
    type PersonLastname,
    TEmail,
    TPersonFirstname,
    TPersonLastname,
    UC,
    type UCAuth,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCManager,
    UCOutputBuilder,
    type UCOutputOrNothing,
    bindCommon,
} from 'libmodulor';
import { bindNodeCore } from 'libmodulor/node';

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

const auth: UCAuth | null = null;
const registerUC = new UC(appManifest, RegisterUCD, auth);

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
bindNodeCore(container);

const ucManager = container.get<UCManager>('UCManager');

const res = await ucManager.execClient(registerUC);

console.log(res);
