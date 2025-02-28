# Expose the mcp-server Target

We'll use the pre-built local [stdio transport](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) `ServerManager`.

```sh
yarn add "@modelcontextprotocol/sdk@^1.6.0"
```

```sh
mkdir src/products/SuperTrader/mcp-server
touch src/products/SuperTrader/mcp-server/{container.ts,index.ts}
```

## container.ts

```typescript
import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type ServerClientManagerSettings,
    type ServerManager,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindNodeCore, bindServer } from 'libmodulor/node';
import { NodeLocalStdioMCPServerManager } from 'libmodulor/node-mcp';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    logger_level: 'error',
}));
bindNodeCore(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);

export default container;
```

## index.ts

```typescript
import {
    APPS_ROOT_DIR_NAME,
    type FSManager,
    type I18nManager,
} from 'libmodulor';
import { MCPServerBooter } from 'libmodulor/node-mcp';

import container from './container.js';

await container.get<I18nManager>('I18nManager').init();

await container.resolve(MCPServerBooter).exec({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
```

> [!NOTE]
> Note how we increase the level of logs to `error` because logging on stdout [messes with the stdio transport](https://modelcontextprotocol.io/docs/tools/debugging#server-side-logging).

## Claude Desktop

If you don't have [Claude Desktop](https://claude.ai/download) on your machine, install it.

The following instructions are for macOS. You might need to adapt the paths if you are using another OS.

Register the mcp server in Claude (make sure you adapt the absolute path to your `libmodulor-tuto` directory).

```sh
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

```json
{
    "mcpServers": {
        "libmodulor-tuto": {
            "command": "node",
            "args": [
                "/Users/toto/libmodulor-tuto/dist/products/SuperTrader/mcp-server/index.js"
            ]
        }
    }
}
```

If you want to enable debugging within Claude Desktop :

```sh
nano ~/Library/Application\ Support/Claude/developer_settings.json
```

```json
{
    "allowDevTools": true
}
```

To vizualize the logs :

```sh
ls -la ~/Library/Logs/Claude
tail -f ~/Library/Logs/Claude/mcp.log
tail -f ~/Library/Logs/Claude/mcp-server-libmodulor-tuto.log
```

To open the Chrome Developer Tools wihtin Claude, press <kbd>cmd</kbd> + <kbd>option</kbd> + <kbd>shift</kbd> + <kbd>I</kbd> (should be easy if you're an emacs user).

## Build & Run

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server if it's running.

```sh
yarn build && yarn run:server
```

Launch Claude Desktop.

At the bottom right of the prompt you should see a little hammer 🔨 indicating `1 MCP Tool available`.

Click on it. You should see the `BuyAsset` use case registered.

Now just write a prompt like below :

```txt
Dear Claude. Please buy 150 shares of Google.
```

And let the magic happens.

<img src="/docs/assets/trading-target-mcp-server.png" width="600px">

Open the SQLite database with your favorite DB editor (e.g. TablePlus, DBeaver...).

```sh
open dist/products/SuperTrader/server/uc-data-store.sqlite
```

```sh
yarn lint && yarn test && git add . && git commit -m "feat: add the mcp-server target"
```

Now that's done, let's [Expose the rn Target](./012_Expose_the_rn_Target.md).
