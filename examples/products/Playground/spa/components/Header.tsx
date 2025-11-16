import { type ReactElement, useState } from 'react';

import type { ProductManifest } from '../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../dist/esm/index.react.js';

export default function Header(): ReactElement {
    const { container, wordingManager } = useDIContext();

    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const { desc, slogan } = wordingManager.p();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1>{productManifest.name}</h1>
            <h2>{slogan}</h2>
            {desc && <span>{desc}</span>}
        </div>
    );
}
