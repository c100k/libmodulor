# CHANGELOG

## v0.20.0 (unreleased)

**Added**

- Add ability to stream data in `ShellCommandExecutor`
- Stream output with color when using the `TestApp` command
- Check app sources before executing the test in `TestApp` : this allows to spot errors earlier and avoid cryptic exec errors when the sources are not valid (don't forget to re-generate the tests with `pnpm libmodulor GenerateAppsTests` and use `--updateSnapshots` the next time you call `TestApp --appName YourApp`)

**Misc**

- Add the `Toolbox` app to `examples` (for docs)
- Expose `UC_POLICY_FILE_NAME_EXT` and `UC_POLICY_FILE_NAME_SUFFIX` in the convention
- Move `examples/embedded` to `examples/standalone`
- Add the `GeocodeAddress` UCD to `Toolbox` (for docs)
- Add the `MyRunningMap` app to `examples` (for docs)
- Harmonize `examples` apps testing

## v0.19.0 (2025-06-20)

**BREAKING**

- Introduce `Initializable.initSync()` : useful for contexts where async is not available (e.g. Cloudflare workers initialization) => To address, simply add the method in the concerned implementations. You can leave it empty, re-use the same logic as your existing `init()` if its core is not async, or copy it and adapt it to make it sync. If you want to forbid its usage, use `throw new NotCallableError<this>('initSync', 'init', 'async-only');`
- Introduce `ServerManager.mountSync()` : useful for contexts where async is not available (e.g. Cloudflare workers initialization) => To address, simply add the method in the concerned implementations. You can leave it empty, re-use the same logic as your existing `mount()` if its core is not async, or copy it and adapt it to make it sync. If you want to forbid its usage, use `throw new NotCallableError<this>('mountSync', 'mount', 'async-only');`
- Change `uc_data_store_ucs_dataset_name` default value from `use-cases` to `uc_executions` : if you relied on the default value and want to keep it, explicitly set `uc_data_store_ucs_dataset_name` in your settings. If you want the new name, rename your existing collection to the new name
- Make `UCDataStore` compliant with `Initializable` : rename `install` to `init`, add `initSync` and rename `initTx` to `startTx`

**Added**

- Introduce `target/edge-worker-hono-server` to be able to deploy easily on Cloudflare Workers
- Introduce `NotAvailableError` for better semantics and more meaningful error messages
- Introduce `NotImplementedError` for better semantics and more meaningful error messages
- Init `i18nManager` in `MCPServerBooter` and `NodeCoreCLIManager` : you can remove any initialization made before executing those

**Fixed**

- Update `UCOutputBuilder` total when removing

**Misc**

- Extract server targets functions for better reusability

## v0.18.1 (2025-06-11)

**Misc**

- Adjust `CreateProject` biome config

## v0.18.0 (2025-06-11)

**Misc**

- Switch to `react-jsx` (instead of `react`) : the targets relying on React now use `react/jsx-runtime` instead of the legacy `React.createElement`
- Upgrade to `biome` `2.0.0`
- Reduce usage of `useLiteralKeys`

## v0.17.0 (2025-06-02)

**BREAKING**

- Make `target/react-native-pure` and `target/react-web-pure` components stylable : by using the new `<StyleContextProvider style={...style} />` you can customize how the elements render inside `<UCPanel />`. You can even use `renderFormFieldControl` to customize the form controls rendered according to the field (e.g. name, type, etc.)

## v0.16.0 (2025-05-27)

**BREAKING**

- Make `pnpm` (in replacement of `yarn`) the default package manager in `npx libmodulor CreateProject`

## v0.15.0 (2025-05-25)

**Added**

- In `LLMManager`, allow to pass the `apiKey` directly in the request. It precedes the settings value defined at the implementation level
- In `target/react`, add optional `className` to stylable components
- In `target/web`, handle use case input field initial value
- Add `Embedded` use case examples in the docs

## v0.14.0 (2025-05-24)

- Introduce `useAction` for react targets : it's a use case agnostic way of invoking an action

## v0.13.1 (2025-05-02)

**Fixed**

- Disable TypeScript [incremental](https://www.typescriptlang.org/tsconfig/#incremental) when analyzing app sources in automated test

## v0.13.0 (2025-04-25)

**Added**

- Introduce `target/node-hono-server` allowing you to expose a server using [Hono](https://hono.dev) in addition to the existing implementations based on [express](https://expressjs.com) and [next.js](https://nextjs.org)

**Misc**

- Upgrade `examples/supertrader` to rn `react-native@0.79.x` and `expo@53.x`

## v0.12.0 (2025-04-13)

**BREAKING**

- Upgrade to inversify 7 : In addition to bumping the dependency, checkout the [migration guide](https://inversify.io/docs/guides/migrating-from-v6) and this [discussion](https://github.com/inversify/InversifyJS/discussions/1765)
- In `FSManager`, add ability to `touch` file from `ArrayBuffer` : If you have a custom implementation, handle the new generic and handle both type of content

**Added**

- Introduce `ServerRequestHandler` : Used in `NodeExpressServerManager` and all the upcoming server targets, it contains everything needed to execute a use case on a server. You can use it to implement your own server (e.g. `Fastify` and so on)
- Introduce `NextJSServerManager` and `NextJSAPIRouteHandler` : Used to execute use cases within a [Next.js route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

**Fixed**

- Handle body with only one file in `target/node-express-server`

**Misc**

- Showcase empty state and usage of more daisyUI components (e.g. loaders) in `examples/supertrader`
- Replace `path` by `parentPath` in `NodeFSManager`
- Prefix internal server error in dev mode
- Write uc input file instead of cp when in memory
- Create server tmp dir at startup if not present

## v0.11.1 (2025-04-03)

**Fixed**

- Ajust `appPath` in `yarn libmodulor TestApp` command

## v0.11.0 (2025-04-03)

**BREAKING**

- Remove `ContainerPrinter` : It was using internals of inversify v6. These internals are not present anymore in v7 and the maintainers were not convinced about adding something to list the bindings of a container. In prevision of the upgrade to v7, unfortunately, we remove it to keep things simple
- Upgrade to express 5 : Unless you extended `NodeExpressServerManager` and did some special stuff, this should be transparent to you. Except bumping the version to `5.1.0`, there should be nothing to do. Otherwise, check the excellent [migration guide](https://expressjs.com/en/guide/migrating-5.html)

**Fixed**

- Return early when parent data type validation is not ok
- Adjust the `npx libmodulor CreateProject` command

**Misc**

- Analyze the web bundle of `examples/supertrader` (`(cd examples/supertrader && yarn build:analyze:web)`)
- Include data-types tables in `llms.txt`
- Update UC input field when forcing the value in `rInput` (e.g. boolean set to false or array set to empty)

## v0.10.0 (2025-03-28)

**Added**

- Introduce `UCOutputFieldValueFragment` in `target/react` and `UCOutputFieldValue` in `target/react-(native|web)-pure` to display uc values using the `fmt()` method of each data type. `TBoolean.fmt()` has been adapted to display `✔️` when `true`, instead of `true|false` which are not very user friendly in a UI
- Introduce `Year` data type

**Fixed**

- Adjust `fmt` of `THostPort` and `TTimestamp` (they shouldn't be formatted as numbers) and `tName` of `TEmbeddedObject`

**Misc**

- Update `examples/supertrader` to showcase type semantics and displaying UC output fields according to the definition
- In `target/react`, make `useUCOR` return a `Part0` always set : you can remove all the now obsolete patterns like `if (listItemsPart0)`, `listItemsPart0 &&`, `listItemsPart0?.`, `listItemsPart0!.` in your React components relying on `useUCOR`. Also expose the function signatures used by `useUC` and `useUCOR` to make them easily passable as children props
- List base and final data types directly in the documentation => https://libmodulor.c100k.eu/docs/references/data-types

## v0.9.0 (2025-03-20)

**BREAKING**

- Move `bindServer` to `libmodulor/node-express`. The following dependencies (`jose`) are now optional. You can remove them if you're using `libmodulor/node` elements in non server targets like `cli`
- Upgrade to `fast-check` [v4](https://fast-check.dev/docs/migration-guide/from-3.x-to-4.x) : Re-generate your tests with `yarn libmodulor GenerateAppsTests` to get the changes adapted to this version

**Misc**

- Make `buffer`, `fast-check` and `vitest` deps optional : basic uses of `libmodulor` do not require them (see https://libmodulor.c100k.eu/docs/examples/Basic as an example). You can remove them if you're not using the automated tests
- Add `ListOrdersUCD` and `CancelOrderUCD` to `examples/supertrader` to showcase data fetching, aggregate building, sensitive use cases, test flows, etc.
- Remove linter config from examples (linting from repo root folder)
- Use `debug` instead of `trace` in `ConsoleLogger`

## v0.8.0 (2025-03-13)

**BREAKING**

- Move `NodeExpressServerManager` to a dedicated export (`libmodulor/node` => `libmodulor/node-express`). The following dependencies (`cookie-parser`, `express`, `express-fileupload` and `helmet`) are now optional. You can remove them if you're using `libmodulor/node` elements in non server targets like `cli`
- Do not enforce `dt` and `policies` folders in app src : place everything that **is not** `*UCD` and `*ServerMain` into `lib` the way you prefer
- Check app src folder contents : it must contain only the elements allowed by the spec (Re-generate your tests with `yarn libmodulor GenerateAppsTests` to enforce the new rule)

**Misc**

- Introduce new "Basic" example showing all the primitives in action in one single `.ts` file
- Move `examples/libmodulor-tuto` to `examples/supertrader`
- Add `llms.txt` to docs at https://libmodulor.c100k.eu/llms.txt

## v0.7.0 (2025-03-07)

**Added**

- Make `npx libmodulor CreateProject` more generic : you can now customize the `initialCommit` (default is `chore: initial commit`), the `pkgManagerBin` (default is `yarn`, works with `npm`, `pnpm`, `bun`, etc.), the `scmBin` (default is `git`)

**Fixed**

- Derandomize UC input before snapshotting in tests : after the upgrade to TS 5.8, snapshotting a UC including a File as input would break as a new `state` property has appeared with a dynamic `lastModified` property

**Misc**

- Move the documentation with concepts, examples, guides and references to https://libmodulor.c100k.eu

## v0.6.1 (2025-02-28)

**Fixed**

- Create project with the latest version

## v0.6.0 (2025-02-28)

**BREAKING**

- Extract common react elements on web and rn, renaming some of the props : check the new props names and the new `validateFormField` to simplify your overrides
- Remove `helper` from the exports map : it makes no sense to expose it as it is an executable (see `npx libmodulor` below)

**Added**

- Introduce the `npx libmodulor CreateProject` command
- Introduce `select` to target `react-web-pure` : it now renders an HTML `select` when the UC input field `hasOptions()`

**Misc**

- Bump `react` to `19.0.0`
- Add a new "Style the web Target" tutorial step showing how to use `tailwindcss` and `daisyUI` to provide custom components

## v0.5.0 (2025-02-24)

**BREAKING**

- Replace `.js` by `.ts` for `ProductManifest`

**Added**

- Introduce a 3<sup>rd</sup> implementation of `LLMManager` (`OllamaLLMManager`) to run models locally
- Introduce `LLMManager` with 2 implementations (`MistralAILLMManager` and `OpenAILLMManager`)

**Misc**

- Simplify the signature of `UCDef.ext.http.transform` removing the generic `T` return
- Add JSDocs and comments for a better in-place documentation (i.e. in .d.ts files)
- Add the Tutorial code in the repo at `examples/libmodulor-tuto` and add a new "Expose a rn Target" step

## v0.4.0 (2025-01-31)

**feat(target): introduce react-native-pure**

To help with the creation of specific targets, we've added a new one : `react-native-pure`. It's as simple as `react-web-pure`, with no specific UI style. It's a good starting point to take inspiration to create your own GUI target, with your own style.

**Misc**

- Introduced Guides in docs for more advanced scenarios (e.g. Create a target) (https://github.com/c100k/libmodulor/pull/10)
- Improved the docs for a better readability (https://github.com/c100k/libmodulor/pull/10)

## v0.3.0 (2025-01-23)

**feat(uc): introduce alternate mounting point**

Added a new property `UCDef.ext.http.mountAlsoAt` to be able to define path aliases. See the comment below to understand why.

```typescript
/**
 * The path on which the use case should also mounted at
 *
 * This is typically used when the mounting point is changed and you want to maintain a "legacy" endpoint for clients having
 * a different release cycle than the server (e.g. a mobile app), who are still calling the old endpoint.
 */
mountAlsoAt?: UCHTTPMountingPoint[];
```

**feat(uc): add id to fields in UCOutputReader**

The `UCOutputReader` automatically builds a fields list based on the `UCDef.io.o` `fields` and `order`. Although being a technical value, it's sometimes useful to get the `id` as a field as well as all the other fields explicitly defined. Hence the addition of `id` to the fields list.

## v0.2.0 (2025-01-20)

It's finally here ! Very first version of the library with all the primitives discussed in the documentation.

Check it out, play with it, break it, have fun !

Note that the code is not available yet on GitHub but it will be very soon.

## v0.1.0 (2025-01-17)

First release with the documentation and a stub entrypoint.
