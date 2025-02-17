# Create the project

Assuming you have the following installed (otherwise, install them or adapt the commands) :

- `node` >= 22
- `yarn` >= 1.x
- `wget` and `curl`

If you're on macOS, for the `sed` commands, add a `''` after `-i` ([Explanation](https://stackoverflow.com/a/4247319/1259118)).

```sh
# Create the directory
mkdir libmodulor-tuto && cd libmodulor-tuto # Note how the repository is generic to contain multiple apps and products

# Initialize git
git init

# Initialize config files
touch .gitignore biome.json package.json README.md tsconfig.json vitest.config.ts
```

## .gitignore

```.gitignore
coverage
dist
node_modules
src/apps/**/test/reports
src/apps/**/test/*.test.ts
src/products/**/rn/.expo
.env
```

## biome.json

```json
{
    "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
    "files": {
        "ignore": ["coverage", "dist", "node_modules"],
        "ignoreUnknown": true
    },
    "formatter": {
        "indentStyle": "space",
        "indentWidth": 4
    },
    "javascript": {
        "formatter": {
            "quoteStyle": "single"
        },
        "parser": {
            "unsafeParameterDecoratorsEnabled": true
        }
    }
}
```

## package.json

```json
{
    "name": "libmodulor-tuto",
    "version": "0.1.0",
    "author": "Chafik H'nini <chafik.hnini@gmail.com>",
    "type": "module",
    "private": true,
    "scripts": {
        "helper": "node ./node_modules/libmodulor/dist/esm/products/Helper/index.js",
        "lint": "biome check --write .",
        "test": "tsc && vitest run"
    },
    "dependencies": {
        "inversify": "^6.2.2",
        "libmodulor": "^0.4.0",
        "reflect-metadata": "^0.2.2"
    },
    "devDependencies": {
        "@biomejs/biome": "^1.9.4",
        "@types/node": "^22.13.4",
        "@vitest/coverage-v8": "^3.0.5",
        "buffer": "^6.0.3",
        "cookie-parser": "^1.4.7",
        "express": "^4.21.2",
        "express-fileupload": "^1.5.1",
        "fast-check": "^3.23.2",
        "helmet": "^8.0.0",
        "jose": "^5.9.6",
        "typescript": "^5.7.3",
        "vite": "^6.1.0",
        "vitest": "^3.0.5"
    }
}
```

## README.md

```md
# libmodulor-tuto

🚀🚀🚀
```

## tsconfig.json

```json
{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "declaration": true,
        "lib": ["dom", "esnext"],
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "noEmit": true,
        "removeComments": true,
        "skipLibCheck": true,
        "sourceMap": true,
        "target": "ESNext",

        "strict": true,
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "exactOptionalPropertyTypes": true,
        "noFallthroughCasesInSwitch": true,
        "noPropertyAccessFromIndexSignature": true,
        "noImplicitOverride": true,
        "noImplicitReturns": true,
        "noUncheckedIndexedAccess": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "verbatimModuleSyntax": true,

        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,

        "jsx": "react"
    }
}
```

## vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            exclude: ['src/apps/**/test', 'src/**/*.test.ts'],
            include: ['src'],
            reporter: ['html', 'lcov', 'text'],
        },
        reporters: ['verbose'],
    },
});
```

## Install

```sh
yarn install
```

```sh
yarn lint && yarn test && git add . && git commit -m "chore: init source code"
```

Optionally, you can create a remote repository (e.g. on GitHub) and push it.

Now that's done, let's [Create the App](./002_Create_the_App.md).
