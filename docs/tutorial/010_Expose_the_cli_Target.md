# Expose the cli Target

We'll use the pre-built [Node.js parseArgs](https://nodejs.org/api/util.html#utilparseargsconfig) `CLIManager`.

```sh
mkdir src/products/SuperTrader/cli
touch src/products/SuperTrader/cli/{container.ts,index.ts}
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
import { bindNodeCLI, bindNodeCore } from 'libmodulor/node';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

const container = new Container(CONTAINER_OPTS);

bindCommon<ServerClientManagerSettings>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
}));
bindNodeCore(container);
bindNodeCLI(container);
bindProduct(container, Manifest, I18n);

export default container;
```

## index.ts

```typescript
import {
    APPS_ROOT_DIR_NAME,
    type FSManager,
    type I18nManager,
} from 'libmodulor';
import { NodeCoreCLIManager } from 'libmodulor/node';

import container from './container.js';

await container.get<I18nManager>('I18nManager').init();

await container.resolve(NodeCoreCLIManager).handleCommand({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
```

## Build & Run

Update `package.json` to add a new entry to the `scripts`.

```json
"run:cli": "cd dist/products/SuperTrader/cli && node index.js",
```

```sh
yarn build && yarn run:cli
```

You can see the CLI help appearing with the available commands.

> [!TIP]
> Update the app's `i18n.ts` to add `uc_BuyAsset_desc` and `ucif_isin_desc` to have a more detailed help section.

Start the server if it's not running.

```sh
yarn run:server
```

Execute the CLI in another terminal or tab.

```sh
yarn run:cli Trading_BuyAsset
# ❌ ISIN must be filled
yarn run:cli Trading_BuyAsset --isin US02079K3059 --limit 123.5 --qty 150
# ✅ {"parts":{"_0":{"items":[{"executedDirectly":false,"id":"da3dc295-6d7c-41b1-a00a-62683f3e6ab9"}],"total":1}}}
```

Open the SQLite database with your favorite DB editor (e.g. TablePlus, DBeaver...).

```sh
open dist/products/SuperTrader/server/uc-data-store.sqlite
```

```sh
yarn lint && git add . && git commit -m "feat: add the cli target"
```

Now that's done, let's [Expose the mcp-server Target](./011_Expose_the_mcp_server_Target.md).
