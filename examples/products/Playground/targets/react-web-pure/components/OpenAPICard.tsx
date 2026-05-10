import type { ReactElement } from 'react';

import { useDIContext } from '../../../../../../dist/esm/index.react.js';

export default function OpenAPICard(): ReactElement {
    const { i18nManager } = useDIContext();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
                href="/api/openapi.json"
                rel="noopener noreferrer"
                target="_blank"
            >
                {i18nManager.t('openapi_spec')}
            </a>
            <a
                href="http://localhost:8082"
                rel="noopener noreferrer"
                target="_blank"
            >
                {i18nManager.t('openapi_swagger_docker')}
            </a>
            <code>
                docker run -p 8082:8080 -e
                SWAGGER_JSON_URL=http://localhost:7443/api/openapi.json
                swaggerapi/swagger-ui:v5.32.5
            </code>
            <a
                href="https://editor.swagger.io"
                rel="noopener noreferrer"
                target="_blank"
            >
                {i18nManager.t('openapi_swagger_online')}
            </a>
            <span>File -&gt; Import URL</span>
            <code>http://localhost:7443/api/openapi.json</code>
            <a
                href="https://redocly.github.io/redoc"
                rel="noopener noreferrer"
                target="_blank"
            >
                {i18nManager.t('openapi_redoc_online')}
            </a>
            <code>wget http://localhost:7443/api/openapi.json</code>
            <span>-&gt; Upload a file</span>
        </div>
    );
}
