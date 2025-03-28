# CHANGELOG

## v0.10.0 (unreleased)

**Misc**

- Update `examples/supertrader` to showcase type semantics and displaying UC output fields according to the definition
- In `target/react`, make `useUCOR` return a `Part0` always set : you can remove all the now obsolete patterns like `if (listItemsPart0)`, `listItemsPart0 &&`, `listItemsPart0?.`, `listItemsPart0!.` in your React components relying on `useUCOR`. Also expose the function signatures used by `useUC` and `useUCOR` to make them easily passable as children props
- Introduce `UCOutputFieldValueFragment` in `target/react` and `UCOutputFieldValue` in `target/react-(native|web)-pure` to display uc values using the `fmt()` method of each data type. `TBoolean.fmt()` has been adapted to display `✔️` when `true`, instead of `true|false` which are not very user friendly in a UI

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
