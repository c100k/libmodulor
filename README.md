# libmodulor

[![npm version](https://img.shields.io/npm/v/libmodulor.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/libmodulor)
[![license](https://img.shields.io/badge/license-LGPL-green.svg?style=for-the-badge)](https://github.com/c100k/libmodulor/blob/master/LICENSE)

A TypeScript library to create platform-agnostic applications.

> [!WARNING]
> The project is still in active development. Although already used in pilot projects, it's not suitable for all production scenarios yet.
> Being developed by only one person, it may keep going for years or stop at any time.
> In the meantime, it's still a "research project" that needs improvement. Thus, it will be subject to BREAKING CHANGES as long as the version is not `1.0.0`.
> All that said, the end goal is really to have a **production-grade library** to help everyone build **quality projects faster**.

## Links

- [Website](https://libmodulor.c100k.eu)
- [Documentation](https://libmodulor.c100k.eu/docs)
- [Concepts > Philosophy](https://libmodulor.c100k.eu/docs/concepts/philosophy)
- [Examples > Playground](https://libmodulor.c100k.eu/docs/examples/Playground)
- [Guides > Create a project](https://libmodulor.c100k.eu/docs/guides/create-project)

## Getting Started

As described in the [Architecture](https://libmodulor.c100k.eu/docs/concepts/architecture) concept, `libmodulor` follows a 4-layer architecture with `UseCase`, `App`, `Product`, and `Target`.

Here is how to easily create all of them, in a brand new project :

```sh
# Create a project
pnpx libmodulor CreateProject --projectName my-super-project
cd my-super-project

# Create an app
pnpm libmodulor CreateApp --appName Banking

# Create a use case
pnpm libmodulor CreateUC --appName Banking --ucName CreateAccount

# Create a product
pnpm libmodulor CreateProduct --productName CustomerPortal

# Create a target
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-core-http-server
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-express-server
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-grpc-server # 🆕
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-hono-server
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-core-cli
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-mcp-server-stdio
```

For more params, checkout the help section : `pnpm libmodulor --help`.

And for more details on the code, follow the ad-hoc guides in the documentation.

## Full Example

A condensed version of [examples/products/Basic](./examples/products/Basic/index.ts), with all 4 layers in a single file :

```ts
import { Container, inject, injectable } from 'inversify';
import {
    type AggregateOPI0,
    type Amount,
    type AppI18n,
    type AppManifest,
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type Email,
    EverybodyUCPolicy,
    type I18nManager,
    type PersonFirstname,
    type ProductI18n,
    type ProductManifest,
    TAmount,
    TEmail,
    TPersonFirstname,
    UC,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';
import { bindNodeCore } from 'libmodulor/node';

// App : a manifest listing its use cases + translations of their fields
const appManifest = {
    languageCodes: ['en'],
    name: 'Event',
    ucReg: { Register: { action: 'Create', icon: 'user', name: 'Register' } },
} satisfies AppManifest;
const appI18n = {
    en: { ucif_email_label: 'Your email', ucof_amount_label: 'To pay' },
} satisfies AppI18n;

// UseCase : typed input / output
interface RegisterInput extends UCInput {
    email: UCInputFieldValue<Email>;
    firstname: UCInputFieldValue<PersonFirstname>;
}
interface RegisterOPI0 extends AggregateOPI0 {
    amount: Amount;
}

// UseCase : the business logic, executed client side here
@injectable()
class RegisterClientMain implements UCMain<RegisterInput, RegisterOPI0> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<RegisterInput, RegisterOPI0>): Promise<
        UCOutput<RegisterOPI0>
    > {
        const { aggregateId } = await this.ucManager.persist(uc); // Saved in the UCDataStore
        return new UCOutputBuilder<RegisterOPI0>()
            .add({ amount: 99.99, id: aggregateId })
            .get();
    }
}

// UseCase : the definition binding fields to data types (validation, formatting...) and lifecycle
const RegisterUCD: UCDef<RegisterInput, RegisterOPI0> = {
    io: {
        i: {
            fields: {
                email: { type: new TEmail() },
                firstname: { type: new TPersonFirstname() },
            },
        },
        o: {
            parts: { _0: { fields: { amount: { type: new TAmount('EUR') } } } },
        },
    },
    lifecycle: {
        client: { main: RegisterClientMain, policy: EverybodyUCPolicy },
    },
    metadata: appManifest.ucReg.Register,
};

// Product : a combination of apps, with merged translations
const productManifest = {
    appReg: [{ name: 'Event' }],
    name: 'Eventer',
} satisfies ProductManifest;
const productI18n = {
    en: { ...I18nEN, ...appI18n.en },
} satisfies ProductI18n;

// Target : the runtime (here plain Node.js), wired via dependency injection
const container = new Container(CONTAINER_OPTS);
bindCommon(container);
bindNodeCore(container);
bindProduct(container, productManifest, productI18n);
await container.get<I18nManager>('I18nManager').init();

// Usage : fill the input (validated by the data types) and execute
const uc = new UC(appManifest, RegisterUCD, null); // null = anonymous user
uc.fill({ email: 'dexter@caramail.com', firstname: 'Dexter' });
const ucor = await container.get<UCManager>('UCManager').execClient(uc);
console.log(ucor.item00().item); // { amount: 99.99, id: '...' }
```

## 👨‍💻 Contribute

If you think you can help in any way, feel free to contact me (cf. `author` in `package.json`). I'd love to chat.

## ⚖️ License

[LGPL-3.0](./LICENSE)
