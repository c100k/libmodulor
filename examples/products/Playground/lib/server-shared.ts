import {
    type ServerManagerSettings,
    TARGET_USUAL_SERVER_MANAGER_CORS_HEADERS,
    TARGET_USUAL_SERVER_MANAGER_CORS_METHODS,
} from '../../../../dist/esm/index.js';

type S = Pick<
    ServerManagerSettings,
    | 'server_cors_credentials'
    | 'server_cors_headers'
    | 'server_cors_methods'
    | 'server_cors_origins'
    | 'server_expose_openapi_spec'
>;

export const DEFAULT_SERVER_SETTINGS: S = {
    server_cors_credentials: true,
    server_cors_headers: TARGET_USUAL_SERVER_MANAGER_CORS_HEADERS,
    server_cors_methods: TARGET_USUAL_SERVER_MANAGER_CORS_METHODS,
    server_cors_origins: [
        // SwaggerUI local with : docker run -p 8082:8080 -e SWAGGER_JSON_URL=http://localhost:7443/api/openapi.json WITH_CREDENTIALS=true swaggerapi/swagger-ui:v5.32.5
        'http://localhost:8082',
        // SwaggerUI online
        'https://editor.swagger.io',
        // Redoc online
        'https://redocly.github.io',
    ],
    server_expose_openapi_spec: true,
};
