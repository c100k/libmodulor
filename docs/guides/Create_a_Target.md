# Create a Target

As seen in the [introduction](../Introduction.md) :

> A target defines how a product is "exposed" to the end user. It's a combination of platform and runtime.

`libmodulor` includes the following targets :

- [node-core-cli](../../dist/esm/target/node-core-cli/NodeCoreCLIManager.js) : a simple CLI implementation based on [Node.js' parseArgs](https://nodejs.org/api/util.html#utilparseargsconfig)
- [node-express-server](../../dist/esm/target/node-express-server/NodeExpressServerManager.js) : a server implementation based on [Node.js](https://nodejs.org) and [Express](https://expressjs.com)
- [node-mcp-server](../../dist/esm/target/node-mcp-server/NodeLocalStdioMCPServerManager.js) : a simple MCP server implementation based on [MCP Standard Input/Output (stdio) transport](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio)
- [react-native-pure](../../dist/esm/target/react-native-pure/UCForm.js) : a simple GUI implementation based on [React Native](https://reactnative.dev)
- [react-web-pure](../../dist/esm/target/react-web-pure/UCForm.js) : a simple GUI implementation based on [React](https://react.dev)

## Create your own

Depending on your needs, you might want to create your own targets for your products. Indeed, there is a high probability that the included ones do not fit your criteria, especially the GUI ones (`react-native-pure`, `react-web-pure`).

### CLI

A CLI target exposes a `Product` so it can be used in a [Terminal Emulator](https://en.wikipedia.org/wiki/List_of_terminal_emulators) :

```sh
node index.js SignIn --email dexter@caramail.com
> Password : *******************

node index.js --help
node index.js --version
```

To create a CLI target, you need to implement the following interface : [CLIManager](../../dist/esm/target/lib/cli/CLIManager.d.ts).

See [node-core-cli](../../dist/esm/target/node-core-cli/NodeCoreCLIManager.js) as an example.

Important aspects to take into account (non-exhaustive list) :

- the command must be mounted at `uc.def.ext.cmd.mountAt ?? ucMountingPoint(uc)`
- the command must execute `uc.def.lifecycle.client.main` according to the `policy`
- each input field must be mapped to a dedicated flag (e.g. `email => --email`)
- take into account the fields type when parsing the command (e.g. `number`, `boolean`)
- take into account the field cardinality when parsing the command (e.g. `--tag Work --tag Boss` => `tag: ['Work', 'Boss']`)
- take into account the field "sensitivity" (see `isSensitive()`) by prompting for them instead of providing a flag to avoid leaking secrets in your history
- expose common commands usually provided by a CLI program (e.g. `--help`, `--version`, etc.) (these are usually not use cases)
- build the help based on `uc.def.io` and `WordingManager`
- build the version based on your `package.json`
- handle unknown commands by whether failing or displaying the help section

Here is a great list of [solutions](https://bloomberg.github.io/stricli/docs/getting-started/alternatives) to build your own.

---

### Server

A server target exposes a `Product` so it can be called as a REST-like API :

```sh
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -H "X-API-Key: PublicApiKeyToBeChangedWhenDeploying" \
    -d '{"email":"dexter@caramail.com","password":"thedarkpassenger305"}' \
    http://localhost:7443/api/v1/SignIn
```

To create a server target, you need to implement the following interface : [ServerManager](../../dist/esm/target/lib/server/ServerManager.d.ts).

See [node-express-server](../../dist/esm/target/node-express-server/NodeExpressServerManager.js) as an example.

Important aspects to take into account (non-exhaustive list) :

- the use case must be mounted at the `path` and `pathAliases` provided by [ucHTTPContract](../../dist/esm/uc/utils/ucHTTPContract.js)
- the request handler must execute `uc.def.lifecycle.server.main` according to the `policy`
- the request handler must handle the `uc.def.io.o.sideEffects`
- the request handler must return a `204` when there is no `uc.def.io.o`
- the request handler must handle the output transformation based on `ext.http.transform`
- the appropriate middleware must be mounted to handle `uc.def.sec.publicApiKeyCheckType`
- the appropriate middleware must be mounted to handle `uc.def.sec.authType`
- cookies must be implemented to handle authentication

> [!NOTE]
> This is the implementation actually used when auto testing an `App`.

---

### GUI

A GUI target exposes a `Product` as a user interface.

Typically, it provides "components" to :

- access a use case (e.g. a button or a link)
- interact with a use case (e.g. a button or a form)

Important aspects to take into account (non-exhaustive list) :

- the "access" component must handle the `uc.def.lifecycle.client.policy`
- the "interact" component must display a form when the use case needs input filling
- the form fields must take into account the input fields type, cardinality, etc.
- the "interact" component must display a control (e.g. a button) when the use case does not need input filling
- the button submitting a use case must handle the different statuses (`idle`, `changing`, `submitting`, etc.)
- the wording must rely on `WordingManager`

See [generic React components](../../dist/esm/target/lib/react) with [react-native-pure](../../dist/esm/target/react-native-pure/UCForm.js) and [react-web-pure](../../dist/esm/target/react-web-pure/UCForm.js) as an example.

---

### Others

The list above corresponds to the current state of human interfaces in Software. We can bet that new ones will arrive pretty soon. So the only limit is your imagination.

We're looking forward to working on AR/VR targets, Voice targets, Haptic targets, etc...
