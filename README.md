# libmodulor

[![npm version](https://img.shields.io/npm/v/libmodulor.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/libmodulor)
[![license](https://img.shields.io/badge/license-LGPL-green.svg?style=for-the-badge)](https://github.com/c100k/libmodulor/blob/master/LICENSE)

A TypeScript library to create platform-agnostic applications.

> [!WARNING]
> The project is still in active development. Although already used in pilot projects, it's not suitable for all production scenarios yet.
> Being developed by only one person, it may keep going for years or stop at any time.
> In the meantime, it's still a "research project" that needs improvement. Thus, it will be subject to BREAKING CHANGES as long as the version is not `1.0.0`.
> All that said, the end goal is really to have a **production-grade library** to help everyone build **quality projects faster**.

## Links

- [Website](https://libmodulor.c100k.eu)
- [Documentation](https://libmodulor.c100k.eu/docs)
- [Concepts > Philosophy](https://libmodulor.c100k.eu/docs/concepts/philosophy)
- [Examples > Playground](https://libmodulor.c100k.eu/docs/examples/Playground)
- [Guides > Playground](https://libmodulor.c100k.eu/docs/guides/create-project)

## Getting Started

As described in the [Architecture](https://libmodulor.c100k.eu/docs/concepts/architecture) concept, `libmodulor` follows a 4-layer architecture with `UseCase`, `App`, `Product`, and `Target`.

Here is how to easily create all of them, in a brand new project :

```sh
# Create a project
npx libmodulor CreateProject --projectName my-super-project
cd my-super-project

# Create an app
pnpm libmodulor CreateApp --appName Banking

# Create a use case
pnpm libmodulor CreateUC --appName Banking --ucName CreateAccount

# Create a product
pnpm libmodulor CreateProduct --productName CustomerPortal

# Create a target
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-express-server
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-hono-server
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-core-cli
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-mcp-server
```

For more params, checkout the help section : `pnpm libmodulor --help`.

And for more details on the code, follow the ad-hoc guides in the documentation.

## 👨‍💻 Contribute

If you think you can help in any way, feel free to contact me (cf. `author` in `package.json`). I'd love to chat.

## ⚖️ License

[LGPL-3.0](./LICENSE)
