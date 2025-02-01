# Expose the rn Target

We'll use the pre-built [React Native](https://reactnative.dev) components with [Expo](https://github.com/expo/expo).

> [!WARNING]
> Like in the `web` Target, there won't be any particular style so we can focus only on the semantics. Feel free to add some if you want to.

```sh
yarn add "react-native@^0.76.6" "expo@^52.0.28"
yarn add --dev "@babel/plugin-transform-class-static-block@^7.26.0" "babel-plugin-parameter-decorator@^1.0.16" "babel-plugin-transform-typescript-metadata@^0.3.2"
```

First, setup your environment as explained in the [react-native documentation](https://reactnative.dev/docs/environment-setup).

> [!NOTE]
> We're voluntarily not using a command like `yarn create expo-app rn --template blank-typescript` because it generates too much noise.

```sh
mkdir -p src/products/SuperTrader/rn/{assets,components}
touch src/products/SuperTrader/rn/{babel.config.cjs,container.ts,index.tsx,metro.config.cjs,tsconfig.json}
touch src/products/SuperTrader/rn/components/App.tsx
```

Grab the expo related files that are not really important in the context of this Tutorial.

```sh
wget -O src/products/SuperTrader/rn/assets/adaptive-icon.png https://raw.githubusercontent.com/c100k/libmodulor/docs-add-examples-tuto/examples/libmodulor-tuto/src/products/SuperTrader/rn/assets/adaptive-icon.png
wget -O src/products/SuperTrader/rn/assets/favicon.png https://raw.githubusercontent.com/c100k/libmodulor/docs-add-examples-tuto/examples/libmodulor-tuto/src/products/SuperTrader/rn/assets/favicon.png
wget -O src/products/SuperTrader/rn/assets/icon.png https://raw.githubusercontent.com/c100k/libmodulor/docs-add-examples-tuto/examples/libmodulor-tuto/src/products/SuperTrader/rn/assets/icon.png
wget -O src/products/SuperTrader/rn/assets/splash-icon.png https://raw.githubusercontent.com/c100k/libmodulor/docs-add-examples-tuto/examples/libmodulor-tuto/src/products/SuperTrader/rn/assets/splash-icon.png
wget -O src/products/SuperTrader/rn/app.json https://raw.githubusercontent.com/c100k/libmodulor/docs-add-examples-tuto/examples/libmodulor-tuto/src/products/SuperTrader/rn/app.json
```

## babel.config.cjs

```js
module.exports = (api) => {
    api.cache(true);
    return {
        plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
            '@babel/plugin-transform-flow-strip-types',
            '@babel/plugin-transform-class-static-block',
            ['@babel/plugin-transform-class-properties', { loose: true }],
            'babel-plugin-parameter-decorator',
        ],
        presets: ['babel-preset-expo'],
    };
};
```

## metro.config.cjs

```js
const { join } = require('node:path');

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
    ...config.resolver,

    // See https://github.com/facebook/metro/issues/886#issuecomment-2232936049
    resolveRequest: (context, rawModuleName, platform) => {
        let moduleName = rawModuleName;

        const isPackage =
            !moduleName.startsWith('.') && !moduleName.startsWith('/');
        const isJsOrJsxFile =
            !isPackage &&
            (moduleName.endsWith('.js') || moduleName.endsWith('.jsx'));
        if (isJsOrJsxFile) moduleName = moduleName.replace(/\.[^/.]+$/, '');

        return context.resolveRequest(context, moduleName, platform);
    },

    // See https://github.com/facebook/metro/issues/1128 / https://metrobundler.dev/docs/configuration/#unstable_enablepackageexports-experimental
    unstable_enablePackageExports: true,
};

config.watchFolders = [join(__dirname, '..', '..', '..', '..')];

module.exports = config;
```

## tsconfig.json

```json
{
    "extends": "expo/tsconfig.base",
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "strict": true
    }
}
```

## container.ts

```typescript
import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type CryptoManager,
    type FSManager,
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindRN } from 'libmodulor/rn';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { RNCryptoManager } from './lib/std/RNCryptoManager.js';
import { RNFSManager } from './lib/std/RNFSManager.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
}));
bindRN(container);
bindProduct(container, Manifest, I18n);

container.bind<CryptoManager>('CryptoManager').to(RNCryptoManager);
container.bind<FSManager>('FSManager').to(RNFSManager);

export default container;
```

We are facing an interesting case here : `libmodulor` does not provide implementations for `std` managers like `CryptoManager` and `FSManager`. Those are required by `libmodulor` to perform some usual operations like generating random UUIDs or processing input files.

We can implement `CryptoManager` using [expo-crypto](https://docs.expo.dev/versions/latest/sdk/crypto) and `FSManager` using [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem) for example.

For now, we'll keep it simple and only provide a stub implementation. It's enough for our simple use case.

```sh
mkdir -p src/products/SuperTrader/rn/lib/std
touch src/products/SuperTrader/rn/lib/std/{RNCryptoManager.ts,RNFSManager.ts}
```

## RNCryptoManager.ts

```typescript
import { injectable } from 'inversify';
import type {
    BufferManagerBase64String,
    CryptoManager,
    CryptoManagerBinaryToTextEncoding,
    CryptoManagerHMACKey,
    CryptoManagerHMACKeyEncoding,
    CryptoManagerHash,
    CryptoManagerHashAlgorithm,
    CryptoManagerRandomString,
    CryptoManagerSalt,
    CryptoManagerSaltedScrypt,
    Password,
    UIntQuantity,
    UUID,
} from 'libmodulor';

// TODO : Implement RNCryptoManager

@injectable()
export class RNCryptoManager implements CryptoManager {
    public async clear(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public hash(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _binaryToTextEncoding: CryptoManagerBinaryToTextEncoding,
    ): CryptoManagerHash {
        throw new Error('Method not implemented.');
    }

    public hmacToBase64(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _key: CryptoManagerHMACKey,
        _keyEncoding: CryptoManagerHMACKeyEncoding,
    ): BufferManagerBase64String {
        throw new Error('Method not implemented.');
    }

    public hmacToHex(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _key: CryptoManagerHash,
        _keyEncoding: CryptoManagerHMACKeyEncoding,
    ): CryptoManagerHash {
        throw new Error('Method not implemented.');
    }

    public async pbkdf2(
        _password: Password,
        _salt: CryptoManagerSalt,
        _iterationsCount: UIntQuantity,
        _keyLength: UIntQuantity,
        _digest: CryptoManagerHashAlgorithm,
    ): Promise<Uint8Array> {
        throw new Error('Method not implemented.');
    }

    public async randomString(
        _length: UIntQuantity,
    ): Promise<CryptoManagerRandomString> {
        throw new Error('Method not implemented.');
    }

    public randomUUID(): UUID {
        throw new Error('Method not implemented.');
    }

    public async scrypt(
        _password: Password,
        _salt: CryptoManagerSalt,
        _keyLength: UIntQuantity,
    ): Promise<CryptoManagerSaltedScrypt> {
        throw new Error('Method not implemented.');
    }
}
```

## RNFSManager.ts

```typescript
import { injectable } from 'inversify';
import type {
    DirPath,
    FSManager,
    FSManagerCatOpts,
    FSManagerChmodMode,
    FSManagerFilePickerOpts,
    FSManagerFilePickerSource,
    FSManagerItemInfo,
    FSManagerLsItem,
    FSManagerLsOpts,
    FSManagerMkdirOpts,
    File,
    FileExtension,
    FileName,
    FilePath,
    Pathname,
} from 'libmodulor';

// TODO : Implement RNFSManager

@injectable()
export class RNFSManager implements FSManager {
    public async canHandleFiles(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async cat<T extends string>(
        _path: FilePath,
        _opts?: FSManagerCatOpts,
    ): Promise<T> {
        throw new Error('Method not implemented.');
    }

    public async chmod(
        _path: Pathname,
        _mode: FSManagerChmodMode,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async cp(_src: Pathname, _dest: Pathname): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async echoIn<T extends string>(
        _src: FilePath,
        _content: T,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async exists(_path: Pathname): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public fileExtension(_fileName: FileName): FileExtension {
        throw new Error('Method not implemented.');
    }

    public async info(_path: Pathname): Promise<FSManagerItemInfo> {
        throw new Error('Method not implemented.');
    }

    public async ls(
        _path: DirPath,
        _opts?: FSManagerLsOpts,
    ): Promise<FSManagerLsItem[]> {
        throw new Error('Method not implemented.');
    }

    public async mkdir(
        _path: DirPath,
        _opts?: FSManagerMkdirOpts,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public path(..._parts: Pathname[]): Pathname {
        throw new Error('Method not implemented.');
    }

    public async pickFiles(
        _source: FSManagerFilePickerSource,
        _opts?: FSManagerFilePickerOpts,
    ): Promise<File[]> {
        throw new Error('Method not implemented.');
    }

    public async rm(_path: Pathname): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async touch<T extends string>(
        _path: FilePath,
        _content: T,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
```

## index.tsx

```tsx
import { registerRootComponent } from 'expo';
import { DIContextProvider } from 'libmodulor/react';
import React, { type ReactElement } from 'react';
import { SafeAreaView } from 'react-native';

import App from './components/App.js';
import container from './container.js';

function Index(): ReactElement {
    return (
        <SafeAreaView>
            <DIContextProvider container={container}>
                <App />
            </DIContextProvider>
        </SafeAreaView>
    );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Index);
```

## App.tsx

Naturally, in real life scenarios, we would never have such a bloated `App.tsx`. Instead, we would create fine-grained components. Everybody does that, right ? Right ?

```tsx
import { type Logger, type ProductManifest, UCOutputReader } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    useUC,
    useUCOR,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-native-pure';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Text, View } from 'react-native';

import { BuyAssetUCD, Manifest } from '../../../../apps/Trading/index.js';

export default function App(): ReactElement {
    const { container, i18nManager, wordingManager } = useDIContext();
    const [logger] = useState(container.get<Logger>('Logger'));
    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, null);
    const [buyAssetPart0, _buyAssetPart1, { append0 }] = useUCOR(
        new UCOutputReader(BuyAssetUCD, undefined),
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            logger.debug('Initializing i18n');
            await i18nManager.init();
            logger.debug('Done initializing i18n');
            setLoading(false);
        })();
    }, [i18nManager, logger]);

    const onError: UCPanelOnError = async (err) => alert(err.message);

    const { slogan } = wordingManager.p();
    const { label } = wordingManager.uc(buyAssetUC.def);
    const { label: idLabel } = wordingManager.ucof('id');
    const { label: executedDirectlyLabel } =
        wordingManager.ucof('executedDirectly');

    return (
        <View style={{ gap: 16, padding: 16 }}>
            {loading && <Text>Loading...</Text>}

            {!loading && (
                <>
                    <Text style={{ fontSize: 24 }}>
                        {productManifest.name} : {slogan}
                    </Text>

                    <Text style={{ fontSize: 16 }}>{label}</Text>

                    <UCPanel
                        clearAfterExec={false}
                        onDone={async (ucor) => append0(ucor)}
                        onError={onError}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        sleepInMs={200} // Fake delay to see submit wording changing
                        uc={buyAssetUC}
                    />

                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <Text>{idLabel}</Text>
                                <Text>{executedDirectlyLabel}</Text>
                            </View>
                        </View>
                        <View>
                            {buyAssetPart0?.items.map((i) => (
                                <View
                                    key={i.id}
                                    style={{ flexDirection: 'row', gap: 16 }}
                                >
                                    <Text>{i.id}</Text>
                                    <Text>
                                        {i.executedDirectly ? '✅' : '❌'}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <Text>{i18nManager.t('total')}</Text>
                                <Text>{buyAssetPart0?.pagination.total}</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
```

## Build & Run

Our `build` script in `package.json` starts to be really long and hardly readable. Let's switch to a dedicate file.

```sh
touch build.sh && chmod u+x build.sh
```

```sh
rm -rf dist

# build all targets
tsc --project tsconfig.build.json

# server specific
cp .env dist/products/SuperTrader/server/.env

# web specific
yarn vite -c src/products/SuperTrader/vite.config.web.ts build

# rn specific
rm -Rf dist/products/SuperTrader/rn # let metro/babel transpiles the code
cp -R src/products/SuperTrader/rn dist/products/SuperTrader/
echo '{"name":"rn","type":"module"}' > dist/products/SuperTrader/rn/package.json
```

In `package.json`, replace the `build` script by the following.

```diff
-"build": "tsc --project tsconfig.build.json && cp .env dist/products/SuperTrader/server/.env && vite -c src/products/SuperTrader/vite.config.web.ts build",
+"build": "./build.sh",
```

Add the scripts to run the app on `android` and `ios`.

```diff
"run:cli": "cd dist/products/SuperTrader/cli && node index.js",
+"run:rn:android": "cd dist/products/SuperTrader/rn && expo start --android",
+"run:rn:ios": "cd dist/products/SuperTrader/rn && expo start --ios",
"run:server": "cd dist/products/SuperTrader/server && node --env-file .env index.js",
```

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server (we'll setup hot reload later).

```sh
yarn build && yarn run:server
yarn run:rn:android
yarn run:rn:ios
```

Et voilà ! The app is installing and running on your Android Emulator and iOS Simulator.

<img src="/docs/assets/trading-target-rn.png" width="600px">

```sh
yarn lint && yarn test && git add . && git commit -m "feat: add the rn target"
```

For now, we're done. Let's review what we've built : [Summary](./030_Summary.md).
