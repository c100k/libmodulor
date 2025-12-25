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
let SrcFilesGenerator = class SrcFilesGenerator {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ files, rootPath }) {
        for await (const [filePath, content] of files) {
            const fileName = filePath[filePath.length - 1];
            if (!fileName) {
                throw new Error(`Incorrect file path : ${filePath}`);
            }
            const rest = filePath.slice(0, -1);
            const path = this.fsManager.path(rootPath, ...rest);
            await this.fsManager.mkdir(path, { recursive: true });
            await this.fsManager.touch(this.fsManager.path(...filePath), content);
        }
    }
};
SrcFilesGenerator = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], SrcFilesGenerator);
export { SrcFilesGenerator };
