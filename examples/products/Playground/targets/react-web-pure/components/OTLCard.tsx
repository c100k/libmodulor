import type { ReactElement } from 'react';

import { useDIContext } from '../../../../../../dist/esm/index.react.js';

export default function OTLCard(): ReactElement {
    const { i18nManager } = useDIContext();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
                href="http://localhost:16686"
                rel="noopener noreferrer"
                target="_blank"
            >
                {i18nManager.t('jaeger_docker')}
            </a>
            <code>
                docker run -p 4317:4317 -p 4318:4318 -p 16686:16686
                jaegertracing/jaeger:2.19.0
            </code>
        </div>
    );
}
