# Expose the web Target

We'll use the pre-built [React](https://react.dev) components to build a SPA (Single Page Application), bundled with [vite](https://vite.dev) and served with the server defined above.

> [!WARNING]
> For readers used to "beautiful" websites à la Linear, Vercel and related, your eyes will burn. You're going to discover the simple and pure CSS-less Web. The most beautiful one.
> Of course, feel free to add CSS if you want to. The main goal here is to focus on the essence of the UI and not the UI design.

```sh
yarn add --dev "@types/react@^18.3.17" "@types/react-dom@^18.3.5"
yarn add "react@^18.3.1" "react-dom@^18.3.1"

mkdir -p src/products/SuperTrader/web/components
touch src/products/SuperTrader/vite.config.web.ts
touch src/products/SuperTrader/web/{container.ts,index.html,index.tsx}
touch src/products/SuperTrader/web/components/App.tsx
```

## vite.config.web.ts

```typescript
import { join } from 'node:path';

import { StripUCDLifecycleServerPlugin } from 'libmodulor/vite';
import { defineConfig } from 'vite';

const base = process.cwd();
const root = join('src', 'products', 'SuperTrader', 'web');
const outDir = join(
    base,
    'dist',
    'products',
    'SuperTrader',
    'server',
    'public',
);

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir,
    },
    plugins: [StripUCDLifecycleServerPlugin],
    root,
});
```

## container.ts

```typescript
import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindWeb } from 'libmodulor/web';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
}));
bindWeb(container);
bindProduct(container, Manifest, I18n);

export default container;
```

## index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport"
        />
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/index.tsx"></script>
    </body>
</html>
```

## App.tsx

Update `src/apps/Trading/index.ts` to expose the use case.

```typescript
export { BuyAssetUCD } from './src/ucds/BuyAssetUCD.js';
```

Naturally, in real life scenarios, we would never have such a bloated `App.tsx`. Instead, we would create fine-grained components. Everybody does that, right ? Right ?

```tsx
import { type Logger, type ProductManifest, UCOutputReader } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    useUC,
    useUCOR,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-web-pure';
import React, { useEffect, useState, type ReactElement } from 'react';

import { BuyAssetUCD, Manifest } from '../../../../apps/Trading/index.js';

export default function App(): ReactElement {
    const { container, i18nManager, wordingManager } = useDIContext();
    const [logger] = useState(container.get<Logger>('Logger'));
    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, null);
    const [buyAssetPart0, _buyAssetPart1, { append0 }] = useUCOR(
        new UCOutputReader(BuyAssetUCD, undefined),
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            logger.debug('Initializing i18n');
            await i18nManager.init();
            logger.debug('Done initializing i18n');
            setLoading(false);
        })();

        const { slogan } = wordingManager.p();
        document.title = `${productManifest.name} : ${slogan}`;
    }, [i18nManager, logger, productManifest, wordingManager]);

    const onError: UCPanelOnError = async (err) => alert(err.message);

    const { slogan } = wordingManager.p();
    const { label } = wordingManager.uc(buyAssetUC.def);
    const { label: idLabel } = wordingManager.ucof('id');
    const { label: executedDirectlyLabel } =
        wordingManager.ucof('executedDirectly');

    return (
        <div>
            {loading && 'Loading...'}

            {!loading && (
                <>
                    <h1>
                        {productManifest.name} : {slogan}
                    </h1>

                    <h2>{label}</h2>

                    <UCPanel
                        clearAfterExec={false}
                        onDone={async (ucor) => append0(ucor)}
                        onError={onError}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        sleepInMs={200} // Fake delay to see submit wording changing
                        uc={buyAssetUC}
                    />

                    <table>
                        <thead>
                            <tr>
                                <th>{idLabel}</th>
                                <th>{executedDirectlyLabel}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyAssetPart0?.items.map((i) => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.executedDirectly ? '✅' : '❌'}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>{i18nManager.t('total')}</th>
                                <th>{buyAssetPart0?.pagination.total}</th>
                            </tr>
                        </tfoot>
                    </table>
                </>
            )}
        </div>
    );
}
```

## index.tsx

```typescript
import { DIContextProvider } from 'libmodulor/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App.js';
import container from './container.js';

const rootElt = document.getElementById('root');
if (!rootElt) {
    throw new Error('Add a div#root in index.html');
}

ReactDOM.createRoot(rootElt).render(
    <StrictMode>
        <DIContextProvider container={container}>
            <App />
        </DIContextProvider>
    </StrictMode>,
);
```

## Build & Run

Update `package.json` to add the `web` build to the `build` command.

```json
"build": "tsc --project tsconfig.build.json && cp .env dist/products/SuperTrader/server/.env && vite -c src/products/SuperTrader/vite.config.web.ts build",
```

Update `src/products/SuperTrader/server/container.ts` to mount the `public` directory.

```diff
...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
+server_static_dir_path: 'public',
```

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server if it's running (we'll setup hot reload later).

```sh
yarn build && yarn run:server
open http://localhost:7443
```

Et voilà ! The server is running ! Fill the form and see how it automatically submits to the server with client side and server side validation out of the box.

<img src="/docs/assets/trading-target-web.png" width="600px">

```sh
yarn lint && yarn test && git add . && git commit -m "feat: add the web target"
```

Now that's done, let's [Switch to a persistent data storage](./008_Switch_to_a_persistent_data_storage.md).
