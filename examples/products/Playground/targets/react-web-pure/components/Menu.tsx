import { type ReactElement, useEffect, useState } from 'react';

import type { ProductManifest } from '../../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../../dist/esm/index.react.js';
import { useGlobalContext } from './GlobalContext.js';
import LangSelector from './LangSelector.js';
import OpenAPICard from './OpenAPICard.js';

export default function Menu(): ReactElement {
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                padding: 8,
            }}
        >
            <LangSelector />

            <div>
                <h1>{productManifest.name}</h1>
                <h4>{slogan}</h4>

                {desc && <p>{desc}</p>}

                <OpenAPICard />
            </div>
        </div>
    );
}
