var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { fmtPadEndFor } from '../terminal/fmt.js';
let ContainerPrinter = class ContainerPrinter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    async exec({ container }) {
        // See https://github.com/inversify/InversifyJS/issues/1584
        // @ts-ignore
        const dictionary = container._bindingDictionary._map;
        const entries = [];
        const keys = [...dictionary.keys()].map(this.symToString);
        const keyPadEnd = fmtPadEndFor(keys);
        const serviceIdentifierPadEnd = fmtPadEndFor([...dictionary.values()].flatMap((bindings) => bindings.map((b) => this.symToString(b.serviceIdentifier))));
        for (const [key, bindings] of dictionary) {
            const name = `\x1b[1m${this.symToString(key).padEnd(keyPadEnd)}\x1b[0m`;
            const implementations = bindings
                .map((b) => {
                const serviceIdentifier = this.symToString(b.serviceIdentifier).padEnd(serviceIdentifierPadEnd);
                const value = b.implementationType?.name ?? '{}';
                const tags = `[type: ${b.type}] [scope: ${b.scope}]`;
                return `${serviceIdentifier} <-- ${value} ${tags}`;
            })
                .join(' / ');
            entries.push(`${name} : ${implementations}`);
        }
        this.logger.debug('Container bindings');
        const sorted = entries.sort((a, b) => a.localeCompare(b));
        for (const e of sorted) {
            this.logger.debug(e);
        }
    }
    symToString(sym) {
        return typeof sym === 'string' ? sym : (sym.name ?? 'UnnamedClass');
    }
};
ContainerPrinter = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __metadata("design:paramtypes", [Object])
], ContainerPrinter);
export { ContainerPrinter };
