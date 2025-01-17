### Test the App

#### Preliminary test

By default, we rely on [vitest](https://vitest.dev) to run the tests and [@vitest/coverage-v8](https://vitest.dev/guide/coverage) for the coverage.

```sh
yarn test
```

```sh
 % Coverage report from v8
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |       0 |       40 |      40 |       0 |                   
 Trading                |       0 |        0 |       0 |       0 |                   
  index.ts              |       0 |        0 |       0 |       0 | 1                 
 Trading/src            |       0 |      100 |     100 |       0 |                   
  i18n.ts               |       0 |      100 |     100 |       0 | 3-5               
  manifest.ts           |       0 |      100 |     100 |       0 | 3-14              
 Trading/src/ucds       |       0 |        0 |       0 |       0 |                   
  BuyAssetServerMain.ts |       0 |        0 |       0 |       0 | 1-28              
  BuyAssetUCD.ts        |       0 |        0 |       0 |       0 | 1-92              
------------------------|---------|----------|---------|---------|-------------------
```

As expected, the coverage report is pretty lame. Which is understandable, since we haven't written any tests yet.

```sh
mkdir src/apps/Trading/test
touch src/apps/Trading/test/Configurator.ts
```

#### Configurator.ts

```typescript
import { type AppTesterCtx, type CryptoManager, bindCommon } from 'libmodulor';
import {
    NodeDeterministicCryptoManager,
    bindNodeCore,
    bindServer,
} from 'libmodulor/node';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';
import { injectable } from 'inversify';

@injectable()
export class Configurator extends SimpleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        bindCommon(container);
        bindNodeCore(container);
        bindServer(container);

        container
            .rebind<CryptoManager>('CryptoManager')
            .to(NodeDeterministicCryptoManager);
    }
}
```

#### Automated test

Generate the automated tests and execute them with the CLI (it does more than a simple `yarn test`).

```sh
yarn cli GenerateAppsTests
yarn cli TestApp --appName Trading
```

```sh
 % Coverage report from v8
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   98.83 |       80 |      80 |   98.83 |                   
 Trading                |       0 |        0 |       0 |       0 |                   
  index.ts              |       0 |        0 |       0 |       0 | 1                 
 Trading/src            |     100 |      100 |     100 |     100 |                   
  i18n.ts               |     100 |      100 |     100 |     100 |                   
  manifest.ts           |     100 |      100 |     100 |     100 |                   
 Trading/src/ucds       |     100 |      100 |     100 |     100 |                   
  BuyAssetServerMain.ts |     100 |      100 |     100 |     100 |                   
  BuyAssetUCD.ts        |     100 |      100 |     100 |     100 |                   
------------------------|---------|----------|---------|---------|-------------------
2024-12-29T11:00:53.178Z [info] Coverage Report => open src/apps/Trading/test/reports/coverage/index.html
2024-12-29T11:00:53.178Z [info] Simple HTML Report => open src/apps/Trading/test/reports/simple-html/index.html
```

That's much better. Without writing any line of test code, we've reached almost 100% coverage. Although coverage is a vanity metric in some way, it still is a valuable one.

Note another important thing : auto documentation. Check out the generated `src/apps/Trading/README.md` that shows a mermaid chart for each use case and a technical summary. This is very valuable to whoever wants to understand what the app does.

To vizualize the mermaid chart, you can copy/paste it [here](https://mermaid.live) or if you've published your repository to GitHub, they are displayed out of the box.

<img src="/docs/assets/trading-buy-asset-sequence-diagram.png" width="600px">

You can see how the special comments we've mentioned earlier show up in this chart. It's nice in order to describe with more details what happens at each step.

Note also the generated "Coverage Report" and the "Simple HTML Report". The former is provided by `c8` while the other is built by `libmodulor`. It gives a great overview of the test scenarios.

> [!NOTE]
> You might have seen that `Configurator` is extensible. It allows you to define specific flows to test a suite of use cases, define specific assertions, etc.

```sh
yarn lint && git add . && git commit -m "test: init app tests"
```

Now that's done, let's [Create the Product](./005_Create_the_Product.md).
