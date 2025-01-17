# Create the Product

Like the app, the product has a `i18n.ts` and `manifest.ts`.

```sh
mkdir -p src/products/SuperTrader
touch src/products/SuperTrader/{i18n.ts,manifest.ts}
```

## i18n.ts

```typescript
import type { ProductI18n } from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';

import { I18n as TradingI18n } from '../../apps/Trading/index.js';

export const I18n: ProductI18n = {
    en: {
        ...I18nEN,
        ...TradingI18n.en,
        p_desc: 'A simple app to trade crypto, shares and other assets',
        p_slogan: 'Trading made simple',
    },
};
```

## manifest.ts

```typescript
import type { ProductManifest } from 'libmodulor';

export const Manifest: ProductManifest = {
    appReg: [{ name: 'Trading' }],
    name: 'SuperTrader',
};
```

> [!NOTE]
> The same way we register use cases in an app, we register apps in a product. Since apps are reusable across products, you can even exclude some use cases for a given product.

```sh
yarn lint && git add . && git commit -m "feat: add the product"
```

Now that's done, let's [Create the server Target](./006_Create_the_server_Target.md).
