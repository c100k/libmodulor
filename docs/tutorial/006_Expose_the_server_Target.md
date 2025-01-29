# Expose the server Target

We'll use the pre-built [express](https://expressjs.com) `ServerManager`.

```sh
mkdir src/products/SuperTrader/server
touch src/products/SuperTrader/server/{container.ts,index.ts}
touch tsconfig.build.json
touch .env
```

## container.ts

```typescript
import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    EnvSettingsManager,
    type ServerManager,
    type ServerManagerSettings,
    type SettingsManager,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import {
    NodeExpressServerManager,
    bindNodeCore,
    bindServer,
} from 'libmodulor/node';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = ServerManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
}));
bindNodeCore(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container.rebind<SettingsManager>('SettingsManager').to(EnvSettingsManager);

container.bind<ServerManager>('ServerManager').to(NodeExpressServerManager);

export default container;
```

## index.ts

```typescript
import {
    APPS_ROOT_DIR_NAME,
    type FSManager,
    type I18nManager,
    ServerBooter,
} from 'libmodulor';

import container from './container.js';

await container.get<I18nManager>('I18nManager').init();

await container.resolve(ServerBooter).exec({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
```

## tsconfig.build.json

```json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "noEmit": false,
        "outDir": "dist"
    },
    "include": ["src"]
}
```

## .env

```properties
app_logger_level=trace # the default is 'debug'
```

> [!TIP]
> A setting named `my_setting` in the code can be overriden with an environment variable called `app_my_setting`.

## Build & Run

Update `package.json` to add new entries to the `scripts`.

```json
"build": "tsc --project tsconfig.build.json && cp .env dist/products/SuperTrader/server/.env",
"run:server": "cd dist/products/SuperTrader/server && node --env-file .env index.js",
```

```sh
yarn build && yarn run:server
```

Et voilà ! The server is running !

```sh
curl -X POST -H "Content-Type: application/json" http://localhost:7443/api/v1/Trading_BuyAsset
# ❌ {"message":"Invalid credentials"}
curl -X POST -H "Content-Type: application/json" -H "X-API-Key: PublicApiKeyToBeChangedWhenDeploying" http://localhost:7443/api/v1/Trading_BuyAsset
# ❌ {"message":"isin must be filled"}
curl -X POST -H "Content-Type: application/json" -H "X-API-Key: PublicApiKeyToBeChangedWhenDeploying" -d '{"isin":"US02079K3059","limit":123.5,"qty":150}' http://localhost:7443/api/v1/Trading_BuyAsset
# ✅ {"parts":{"_0":{"items":[{"executedDirectly":false,"id":"95dddca5-5e9d-48ac-a90c-71a58d4e8554"}],"total":1}}}
```

As you can see, validation comes out of the box. Later we'll see how to add even more precise rules to the data types.

> [!NOTE]
> The `public_api_key` is just a first layer of security to "authenticate" the client apps calling the server. Hopefully this is not the only security mechanism because of course, this key must be present in clear client side (web, cli, curl...). We'll dive deeper in security when we study the policies.

```sh
yarn lint && git add . && git commit -m "feat: add the server target"
```

Now that's done, let's [Expose the web Target](./007_Expose_the_web_Target.md).
