# Create the project

Assuming you have the following installed (otherwise, install them or adapt the commands) :

- `node` >= 22
- `yarn` >= 1.x
- `wget` and `curl`

```sh
npx libmodulor CreateProject --projectName libmodulor-tuto
```

You should obtain an output similar to the following :

```sh
Need to install the following packages:
libmodulor@latest
Ok to proceed? (y) y

2025-02-28T15:32:09.446Z [info] Creating root dir : libmodulor-tuto
2025-02-28T15:32:09.447Z [info] Initializing git repository
2025-02-28T15:32:09.495Z [info] Creating config files
2025-02-28T15:32:09.496Z [info] Creating apps and products directories
2025-02-28T15:32:09.496Z [info] Installing dependencies
2025-02-28T15:32:16.339Z [info] Committing
2025-02-28T15:32:16.483Z [info] Testing dev command : yarn lint
2025-02-28T15:32:17.134Z [info] Testing dev command : yarn test
2025-02-28T15:32:18.342Z [info] Done ! Project ready ! ✅ 🚀
```

Open the generated directory with your favorite editor and start browsing the files to get an overview of the structure. Here is an explanation of what each one does :

- `src/apps` : contains the `apps` of your project (empty for now)
- `src/products` : contains the `products` of your project (empty for now)
- `.gitignore` : includes the files/dirs patterns to exclude from version control
- `biome.json` : config for the linter (feel free to change it if you don't like the defaults)
- `package.json` : main config file containing info, scripts and dependencies
- `README.md` : main documentation file (feel free to enhance it with explanations about the purpose of your application)
- `tsconfig.json` : config file for TypeScript (pretty strict by default)
- `vitest.config.ts` : config file for Vitest, the test runner

Optionally, you can create a remote repository (e.g. on GitHub) and push it.

Now that's done, let's [Create the App](./002_Create_the_App.md).
