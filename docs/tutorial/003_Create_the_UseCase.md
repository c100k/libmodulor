# Create the UseCase

> [!NOTE]
> Starting now, you'll see `UC` or `uc` a lot. It's the abbreviation of `UseCase`. Acronyms are not good in codebases, except those that are commonly used ([debate](https://stackoverflow.com/questions/2236807/java-naming-convention-with-acronyms)). In any case, when you write `UseCase` hundreds of times, you're happy to be able to write `UC` instead. Thus, `UCD` stands for `Use Case Definition`, `UCIF` stands for `Use Case Input Field` and so on.

The app manifest registers all the use cases metadata. Use cases can depend on each other as we'll see later, and this dependency must go through the manifest. Never directly.

Update `manifest.ts` to register the new use case.

```typescript
    // ...
    ucReg: {
        BuyAsset: {
            action: 'Create',
            icon: 'plus',
            name: 'BuyAsset',
        },
    },
    // ...
```

If you're using an IDE with auto-complete, you might have noticed the other properties like `beta`, `new`, `sensitive`. We'll come back to them later.

```sh
mkdir src/apps/Trading/src/dt
touch src/apps/Trading/src/dt/TISIN.ts
touch src/apps/Trading/src/ucds/{BuyAssetServerMain.ts,BuyAssetUCD.ts}
```

## TISIN.ts

An asset is usually identified by a unique code called [ISIN](https://www.isin.org). This is a typical business data type that has specific rules and that is not simply a `string`.

```typescript
import { type TName, TString, type TStringConstraints } from 'libmodulor';

export type ISIN = Capitalize<string>;

export class TISIN extends TString<ISIN, 'ISIN'> {
    public static readonly FORMAT: RegExp = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;

    constructor(constraints?: TStringConstraints) {
        super({
            ...constraints,
            format: { f: 'ISIN', regexp: TISIN.FORMAT },
        });
    }

    public override tName(): TName {
        return 'ISIN';
    }

    public override example(): ISIN {
        return 'US02079K3059';
    }
}
```

## BuyAssetUCD.ts

```typescript
import { inject, injectable } from 'inversify';
import {
    type AggregateOPI0,
    type Amount,
    EverybodyUCPolicy,
    TAmount,
    TBoolean,
    TUIntQuantity,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOutputOrNothing,
    type UCTransporter,
    type UIntQuantity,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

import { type ISIN, TISIN } from '../dt/TISIN.js';
import { BuyAssetServerMain } from './BuyAssetServerMain.js';

export interface BuyAssetInput extends UCInput {
    isin: UCInputFieldValue<ISIN>;
    limit: UCInputFieldValue<Amount>;
    qty: UCInputFieldValue<UIntQuantity>;
}

export interface BuyAssetOPI0 extends AggregateOPI0 {
    executedDirectly: boolean;
}

@injectable()
class BuyAssetClientMain implements UCMain<BuyAssetInput, BuyAssetOPI0> {
    constructor(
        @inject('UCTransporter')
        private ucTransporter: UCTransporter,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<BuyAssetInput, BuyAssetOPI0>): Promise<
        UCOutputOrNothing<BuyAssetOPI0>
    > {
        return this.ucTransporter.send(uc);
    }
}

export const BuyAssetUCD: UCDef<BuyAssetInput, BuyAssetOPI0> = {
    io: {
        i: {
            fields: {
                isin: {
                    type: new TISIN(),
                },
                limit: {
                    type: new TAmount('USD'),
                },
                qty: {
                    type: new TUIntQuantity(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        executedDirectly: {
                            type: new TBoolean(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: BuyAssetClientMain,
            policy: EverybodyUCPolicy,
        },
        server: {
            main: BuyAssetServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.BuyAsset,
};
```

## BuyAssetServerMain.ts

```typescript
import { inject, injectable } from 'inversify';
import {
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from 'libmodulor';

import type { BuyAssetInput, BuyAssetOPI0 } from './BuyAssetUCD.js';

@injectable()
export class BuyAssetServerMain implements UCMain<BuyAssetInput, BuyAssetOPI0> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<BuyAssetInput, BuyAssetOPI0>): Promise<
        UCOutput<BuyAssetOPI0>
    > {
        // >=> Persist the order
        const { aggregateId } = await this.ucManager.persist(uc);

        // >=> TODO : Check the user has enough funds to place the order

        // >=> TODO : Send the order to a queue for processing
        const executedDirectly: BuyAssetOPI0['executedDirectly'] = false;

        return new UCOutputBuilder<BuyAssetOPI0>()
            .add({
                executedDirectly,
                id: aggregateId,
            })
            .get();
    }
}
```

For now, we won't detail all this code but take the time to read it and understand how it works. Hopefully it's clear enough and self-explanatory.

> [!TIP]
> Using a comment following the pattern `// >=> ` in `ClientMain` and `ServerMain` has a specific meaning as we'll see a little bit later.

> [!NOTE]
> Unlike `ClientMain`, `ServerMain` is put in another file for "historical" reasons, mainly for stripping and tree shaking reasons. More on this later.

```sh
yarn lint && yarn test && git add . && git commit -m "feat: add the use case"
```

Now that's done, let's [Test the App](./004_Test_the_App.md).
