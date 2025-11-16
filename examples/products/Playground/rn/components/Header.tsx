import { type ReactElement, useState } from 'react';
import { Text, View } from 'react-native';

import type { ProductManifest } from '../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../dist/esm/index.react.js';
import H1 from './base/H1.js';
import H2 from './base/H2.js';

export default function Header(): ReactElement {
    const { container, wordingManager } = useDIContext();

    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const { desc, slogan } = wordingManager.p();

    return (
        <View style={{ gap: 16 }}>
            <H1 value={productManifest.name} />
            {slogan && <H2 value={slogan} />}
            {desc && <Text>{desc}</Text>}
        </View>
    );
}
