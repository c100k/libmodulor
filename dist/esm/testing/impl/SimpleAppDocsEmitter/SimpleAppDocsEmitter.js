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
import { APP_DOCS_FILE_NAME } from '../../../convention.js';
import { techSummary } from './tech-summary.js';
import { ucSummary } from './uc-summary.js';
let SimpleAppDocsEmitter = class SimpleAppDocsEmitter {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPath, ucDefSourcesCheckerOutput, }) {
        const outPath = this.fsManager.path(appPath, APP_DOCS_FILE_NAME);
        const tpl = template(ucDefSourcesCheckerOutput.items);
        await this.fsManager.touch(outPath, tpl);
        return {
            outPath,
        };
    }
};
SimpleAppDocsEmitter = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], SimpleAppDocsEmitter);
export { SimpleAppDocsEmitter };
// For now, we can have it here. When it becomes harder to maintain, we can introduce some kind of template engine.
// Be aware that this will introduce complexities on building the lib.
// We'll need to include these templates in the build and make them accessible via package.json "exports" or any other mechanism.
// Hence the choice to keep it simple for now.
// Defined it as function in case we need to pass args.
// Using --- for the comment to make it compatible with pandoc
// See https://stackoverflow.com/a/4829998/1259118
const template = (items) => `<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

${items.map(ucSummary).join('\n\n')}

## Technical Summary

${techSummary(items)}
`;
