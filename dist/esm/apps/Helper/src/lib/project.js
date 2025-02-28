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
    "files": {
        "ignore": ["coverage", "dist", "node_modules"],
        "ignoreUnknown": true
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
    }
}
`;
const PACKAGE_JSON = (name) => `{
    "name": "${name}",
    "version": "0.1.0",
    "type": "module",
    "private": true,
    "scripts": {
        "lint": "biome check --write .",
        "test": "tsc && vitest run --passWithNoTests"
    },
    "dependencies": {
        "inversify": "^6.2.2",
        "libmodulor": "^0.5.0",
        "reflect-metadata": "^0.2.2"
    },
    "devDependencies": {
        "@biomejs/biome": "^1.9.4",
        "@types/node": "^22.13.5",
        "@vitest/coverage-v8": "^3.0.7",
        "buffer": "^6.0.3",
        "cookie-parser": "^1.4.7",
        "express": "^4.21.2",
        "express-fileupload": "^1.5.1",
        "fast-check": "^3.23.2",
        "helmet": "^8.0.0",
        "jose": "^6.0.8",
        "typescript": "^5.7.3",
        "vite": "^6.2.0",
        "vitest": "^3.0.7"
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

        "jsx": "react"
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
