import { type ReactElement, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import type { ProductManifest } from '../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../dist/esm/index.react.js';
import H1 from './base/H1.js';
import H2 from './base/H2.js';
import { useGlobalContext } from './GlobalContext.js';
import LangSelector from './LangSelector.js';

export default function Header(): ReactElement {
    const { container, wordingManager } = useDIContext();
    const { lang } = useGlobalContext();

    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [{ desc, slogan }, setInfo] = useState(wordingManager.p());

    // biome-ignore lint/correctness/useExhaustiveDependencies(lang): actually used in wordingManager
    useEffect(() => {
        setInfo(wordingManager.p());
    }, [lang, wordingManager]);

    return (
        <View>
            <View style={{ alignItems: 'flex-end' }}>
                <LangSelector />
            </View>
            <View style={{ gap: 16 }}>
                <H1 value={productManifest.name} />
                {slogan && <H2 value={slogan} />}
                {desc && <Text>{desc}</Text>}
            </View>
        </View>
    );
}
