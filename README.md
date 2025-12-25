# libmodulor

[![npm version](https://img.shields.io/npm/v/libmodulor.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/libmodulor)
[![license](https://img.shields.io/badge/license-LGPL-green.svg?style=for-the-badge)](https://github.com/c100k/libmodulor/blob/master/LICENSE)

A TypeScript library to create platform-agnostic applications.

> [!WARNING]
> The project is still in active development. Although already used in pilot projects, it's not suitable for all production scenarios yet.
> Being developed by only one person, it may keep going for years or stop at any time.
> In the meantime, it's still a "research project" that needs improvement. Thus, it will be subject to BREAKING CHANGES as long as the version is not `1.0.0`.
> All that said, the end goal is really to have a **production-grade library** to help everyone build **quality projects faster**.

## 🚀 Getting Started

If you're discovering `libmodulor`, we recommend reading the [📖 Documentation](https://libmodulor.c100k.eu/docs) first.
You'll find everything you need to get started : Concepts, Examples and Guides.

When you're ready, [🚀 Create a project](https://libmodulor.c100k.eu/docs/guides/create-project) and build the awesome idea you have in mind.

In the meantime, here is how to declare the four layers of `libmodulor`.

_These snippets are extracted from the [`Basic`](https://libmodulor.c100k.eu/docs/examples/Basic) example (check out the full example to get the full picture)._

### App

```ts
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

const appI18n = {
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
} satisfies AppI18n;
```

### Use Case

```ts
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
    metadata: {
        action: 'Create',
        icon: 'user',
        name: 'Register',
    },
};
```

### Product

```ts
const productManifest = {
    appReg: [{ name: 'Event' }],
    name: 'Eventer',
} satisfies ProductManifest;

const productI18n = {
    en: {
        ...I18nEN,
        ...appI18n.en,
    },
    fr: {
        ...I18nFR,
        ...appI18n.fr,
    },
} satisfies ProductI18n;
```

### Target

```ts
const container = new Container(CONTAINER_OPTS);

bindCommon(container);
bindNodeCore(container);
bindProduct(container, productManifest, productI18n);
```


## 👨‍💻 Contribute

If you think you can help in any way, feel free to contact me (cf. `author` in `package.json`). I'd love to chat.

## ⚖️ License

[LGPL-3.0](./LICENSE)
