# libmodulor - Agent Development Guide

This guide provides essential information for agentic coding agents working with the libmodulor TypeScript library.

## Project Overview

**libmodulor** is a TypeScript library for creating platform-agnostic applications following a 4-layer architecture:
- **UseCase** - Business logic layer
- **App** - Application layer 
- **Product** - Product layer
- **Target** - Platform-specific deployment targets

This is a distribution repository containing compiled ESM modules in `dist/esm/`.

## Build & Development Commands

### Core Commands
```bash
# Lint and auto-fix code
pnpm lint

# Lint without auto-fix (CI)
pnpm lint:ci

# Type check and run tests
pnpm test

# Type check only
tsc

# Run tests only
vitest run
```

### Running Individual Tests
```bash
# Run specific test file
vitest run examples/apps/Trading/test/App.test.ts

# Run tests with pattern
vitest run --reporter=verbose "**/test/**/*.test.ts"

# Run tests in watch mode
vitest examples/apps/Trading/test/App.test.ts
```

### CLI Scaffolding Commands
```bash
# Create new project
npx libmodulor CreateProject --projectName my-project

# Create app in existing project
pnpm libmodulor CreateApp --appName Banking

# Create use case
pnpm libmodulor CreateUC --appName Banking --ucName CreateAccount

# Create product
pnpm libmodulor CreateProduct --productName CustomerPortal

# Create target
pnpm libmodulor CreateTarget --productName CustomerPortal --targetName node-express-server
```

## Code Style Guidelines

### Formatting (Biome)
- **Indentation**: 4 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Trailing commas**: Enforced where appropriate

### Import Organization
Imports are automatically organized in this specific order:
1. Node.js built-in modules (`fs`, `path`, etc.)
2. Blank line
3. Package imports (`lodash`, `express`, etc.)
4. Blank line
5. Path imports (`./utils`, `../types`, etc.)

Example:
```typescript
import { join } from 'node:path';
import { readFile } from 'node:fs';

import express from 'express';
import { injectable } from 'inversify';

import { Configurator } from './Configurator.js';
import { Logger } from '../types/Logger.js';
```

### TypeScript Configuration
- **Strict mode**: Enabled
- **Target**: ESNext
- **Module**: NodeNext
- **Module Resolution**: NodeNext
- **Decorators**: Enabled with metadata
- **No implicit any**: Strict
- **No unused variables**: Error
- **Exact optional properties**: Enabled

### Naming Conventions
- **Classes**: PascalCase (`UserManager`, `OrderService`)
- **Interfaces/Types**: PascalCase with descriptive prefixes (`TOrderStatus`, `UCInput`)
- **Functions/Methods**: camelCase (`getUserById`, `processOrder`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- **Files**: PascalCase for classes (`UserManager.ts`), kebab-case for utilities (`file-utils.ts`)

### Error Handling
- Use `CustomError` class from libmodulor for all business logic errors
- Never log or expose stack traces for `CustomError` instances
- Log unexpected errors before re-throwing
- Always handle errors in async functions with try/catch or proper error propagation

### Decorators & Dependency Injection
- Use `@injectable()` for all service classes
- Use `@inject(TOKEN)` for constructor injection
- Enable `unsafeParameterDecoratorsEnabled` in Biome config
- Import from `inversify` for DI container setup

### Testing Guidelines
- Tests are auto-generated - DO NOT EDIT test files directly
- Use Vitest as test runner
- Property testing with fast-check for monkey testing
- Test files located in `examples/*/test/` directories
- Use `describe`, `test`, `expect` from Vitest
- Snapshot testing for output verification

### Architecture Patterns
- **Use Cases**: Implement business logic, extend `UCDef<I, O, S>`
- **Apps**: Container for use cases, have `manifest.ts`
- **Products**: Collection of apps, have `manifest.ts` and `i18n.ts`
- **Targets**: Platform-specific deployment configurations

### File Structure
```
examples/
├── apps/
│   └── AppName/
│       ├── src/
│       │   ├── manifest.ts
│       │   ├── i18n.ts
│       │   ├── lib/          # Shared utilities
│       │   └── ucds/         # Use case definitions
│       ├── test/
│       │   ├── App.test.ts   # Auto-generated
│       │   └── Configurator.ts
│       └── index.ts
└── products/
    └── ProductName/
        ├── targets/
        │   └── PlatformName/
        ├── manifest.ts
        └── i18n.ts
```

### Linting Rules (Key Biome Rules)
- `noInferrableTypes`: Error - Don't annotate obvious types
- `noParameterAssign`: Error - Don't reassign parameters
- `noConsole`: Error - Use proper logging instead
- `useAsConstAssertion`: Error - Use `as const` for literals
- `useSingleVarDeclarator`: Error - One variable per declaration
- `useSelfClosingElements`: Error - Use self-closing tags when possible

### Internationalization
- All user-facing text must support i18n
- Use the i18n system with locale files in `i18n/locales/`
- Supported languages: de, en, es, fr
- Keys should be descriptive and namespaced

### Platform Support
The library supports 25+ platform exports including:
- Node.js (Express, Hono, MCP, CLI, Test)
- React (Web, Native, Pure)
- Next.js
- Cloudflare Workers
- Vite
- Webpack
- Babel
- Web

Import the appropriate platform-specific entry point:
```typescript
import { newNodeAppTester } from 'libmodulor/node-test';
import { I18nEN } from 'libmodulor/locales/en';
import { NodeAppTesterConfigurator } from 'libmodulor/node-test';
```

## Important Notes

- **DO NOT EDIT** auto-generated test files (marked with auto-generation comments)
- This is a research project (v0.26.0) - breaking changes expected until v1.0.0
- Always run `pnpm lint` and `pnpm test` before committing changes
- Use property-based testing for comprehensive coverage
- Follow the 4-layer architecture strictly
- All business logic must be in Use Cases, not in Targets or Products