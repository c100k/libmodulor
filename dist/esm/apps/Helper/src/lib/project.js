const GITIGNORE = `coverage
dist
node_modules
src/apps/**/test/reports
src/apps/**/test/*.test.ts
src/products/**/rn/.expo
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
            "!**/package.json"
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
        "inversify": "^7.5.2",
        "libmodulor": "latest",
        "reflect-metadata": "^0.2.2"
    },
    "devDependencies": {
        "@biomejs/biome": "^2.0.0-beta.6",
        "@types/node": "^22.15.29",
        "@vitest/coverage-v8": "^3.2.0",
        "buffer": "^6.0.3",
        "cookie-parser": "^1.4.7",
        "express": "^5.1.0",
        "express-fileupload": "^1.5.1",
        "fast-check": "^4.1.1",
        "helmet": "^8.1.0",
        "jose": "^6.0.11",
        "typescript": "^5.8.3",
        "vite": "^6.3.5",
        "vitest": "^3.2.0"
    }
}
`;
const README_MD = (name) => `# ${name}

🚀🚀🚀
`;
const TSCONFIG_JSON = `{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "declaration": true,
        "lib": ["dom", "esnext"],
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "noEmit": true,
        "removeComments": true,
        "skipLibCheck": true,
        "sourceMap": true,
        "target": "ESNext",

        "strict": true,
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "exactOptionalPropertyTypes": true,
        "noFallthroughCasesInSwitch": true,
        "noPropertyAccessFromIndexSignature": true,
        "noImplicitOverride": true,
        "noImplicitReturns": true,
        "noUncheckedIndexedAccess": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "verbatimModuleSyntax": true,

        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,

        "jsx": "react-jsx"
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
export function projectFiles(name) {
    return new Map([
        ['.gitignore', GITIGNORE],
        ['biome.json', BIOME_JSON],
        ['package.json', PACKAGE_JSON(name)],
        ['README.md', README_MD(name)],
        ['tsconfig.json', TSCONFIG_JSON],
        ['vitest.config.ts', VITEST_CONFIG_TS],
    ]);
}
