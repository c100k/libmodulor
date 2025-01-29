# Create the App

An app is composed of three main files : `i18n.ts`, `manifest.ts` and `index.ts`.

```sh
mkdir -p src/apps/Trading/src/ucds
touch src/apps/Trading/src/{i18n.ts,manifest.ts}
touch src/apps/Trading/index.ts
```

> [!NOTE]
> There is a lot of controversy about barrel files. In this specific context, they are useful to only expose the necessary things to the upper layers and keep the app isolated.

## i18n.ts

```typescript
import type { AppI18n } from 'libmodulor';

export const I18n: AppI18n = {
    en: {},
};
```

## manifest.ts

```typescript
import type { AppManifest } from 'libmodulor';

export const Manifest = {
    languageCodes: ['en'],
    name: 'Trading',
    ucReg: {},
} satisfies AppManifest;
```

## index.ts

```typescript
// Expose only what's necessary

export { I18n } from './src/i18n.js';
export { Manifest } from './src/manifest.js';
```

```sh
yarn lint && yarn test && git add . && git commit -m "feat: add the app"
```

Now that's done, let's [Create the UseCase](./003_Create_the_UseCase.md).
