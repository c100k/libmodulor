import { type ReactElement, useEffect, useState } from 'react';

import type { ProductManifest } from '../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../dist/esm/index.react.js';
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
        <div>
            <div
                style={{
                    alignItems: 'flex-end',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <LangSelector />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h1>{productManifest.name}</h1>
                <h2>{slogan}</h2>
                {desc && <span>{desc}</span>}
            </div>
        </div>
    );
}
