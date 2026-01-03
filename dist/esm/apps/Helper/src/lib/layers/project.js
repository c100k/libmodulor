import { APP_TEST_DIR_NAME, APPS_ROOT_PATH, } from '../../../../../convention.js';
const GITIGNORE = `coverage
dist
node_modules
${APPS_ROOT_PATH.join('/')}/**/${APP_TEST_DIR_NAME}/reports
${APPS_ROOT_PATH.join('/')}/**/${APP_TEST_DIR_NAME}/*.test.ts
.env
`;
const BIOME_JSON = `{
    "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
    "assist": {
        "actions": {
            "source": {
                "organizeImports": {
                    "level": "on",
                    "options": {
                        "groups": [
                            [":NODE:"],
                            ":BLANK_LINE:",
                            [":PACKAGE:"],
                            ":BLANK_LINE:",
                            [":PATH:"]
                        ]
                    }
                },
                "useSortedAttributes": "on",
                "useSortedKeys": "on"
            }
        }
    },
    "files": {
        "ignoreUnknown": true,
        "includes": [
            "**",
            "!**/coverage",
            "!**/dist",
            "!**/node_modules",
            "!**/package.json",
            "!**/src/**/test/reports"
        ]
    },
    "formatter": {
        "indentStyle": "space",
        "indentWidth": 4
    },
    "javascript": {
        "formatter": {
            "quoteStyle": "single"
        },
        "parser": {
            "unsafeParameterDecoratorsEnabled": true
        }
    },
    "linter": {
        "rules": {
            "style": {
                "noInferrableTypes": "error",
                "noParameterAssign": "error",
                "noUnusedTemplateLiteral": "error",
                "noUselessElse": "error",
                "useAsConstAssertion": "error",
                "useDefaultParameterLast": "error",
                "useEnumInitializers": "error",
                "useNumberNamespace": "error",
                "useSelfClosingElements": "error",
                "useSingleVarDeclarator": "error"
            },
            "suspicious": {
                "noConsole": "error"
            }
        }
    }
}
`;
export const PACKAGE_JSON = (name) => `{
    "name": "${name}",
    "version": "0.1.0",
    "type": "module",
    "private": true,
    "scripts": {
        "lint": "biome check --write .",
        "test": "tsc && vitest run --passWithNoTests"
    },
    "dependencies": {
        "inversify": "^7.10.8",
        "libmodulor": "latest",
        "reflect-metadata": "^0.2.2"
    },
    "devDependencies": {
        "@biomejs/biome": "^2.3.10",
        "@types/node": "^25.0.3",
        "@vitest/coverage-v8": "^3.2.4",
        "buffer": "^6.0.3",
        "cookie-parser": "^1.4.7",
        "express": "^5.2.1",
        "express-fileupload": "^1.5.2",
        "fast-check": "^4.5.3",
        "helmet": "^8.1.0",
        "jose": "^6.1.3",
        "typescript": "^5.9.3",
        "vite": "^6.4.1",
        "vitest": "^3.2.4"
    }
}
`;
const README_MD = (name) => `# ${name}

🚀🚀🚀
`;
const TSCONFIG_JSON = `{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "declaration": true,
        "emitDecoratorMetadata": true,
        "exactOptionalPropertyTypes": true,
        "experimentalDecorators": true,
        "jsx": "react-jsx",
        "lib": ["dom", "esnext"],
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "noEmit": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitOverride": true,
        "noImplicitReturns": true,
        "noPropertyAccessFromIndexSignature": true,
        "noUncheckedIndexedAccess": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "removeComments": true,
        "skipLibCheck": true,
        "sourceMap": true,
        "strict": true,
        "target": "ESNext",
        "verbatimModuleSyntax": true
    }
}
`;
const VITEST_CONFIG_TS = `import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            exclude: ['src/apps/**/test', 'src/**/*.test.ts'],
            include: ['src'],
            reporter: ['html', 'lcov', 'text'],
        },
        reporters: ['verbose'],
    },
});
`;
export function files(name) {
    return new Map([
        [['.', '.gitignore'], GITIGNORE],
        [['.', 'biome.json'], BIOME_JSON],
        [['.', 'package.json'], PACKAGE_JSON(name)],
        [['.', 'README.md'], README_MD(name)],
        [['.', 'tsconfig.json'], TSCONFIG_JSON],
        [['.', 'vitest.config.ts'], VITEST_CONFIG_TS],
    ]);
}
