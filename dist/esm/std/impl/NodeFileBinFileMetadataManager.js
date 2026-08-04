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
import { extname } from 'node:path';
import { inject, injectable } from 'inversify';
const MAPPING = new Map([['jpeg', 'jpg']]);
let NodeFileBinFileMetadataManager = class NodeFileBinFileMetadataManager {
    shellCommandExecutor;
    // This is not ideal at all but it solves most of the requirements,
    // without having to install an external package such as file-type.
    // If need be, one can create their own implementation.
    constructor(shellCommandExecutor) {
        this.shellCommandExecutor = shellCommandExecutor;
    }
    async info(file) {
        const input = Buffer.from(await file.bytes());
        const extOut = await this.call('extension', input);
        const mimeTypeOut = await this.call('mime-type', input);
        let ext = extOut.trim();
        if (ext.includes('/')) {
            ext =
                ext
                    .split('/')
                    .map((e) => e.trim())
                    .at(0) ?? '';
        }
        if (!ext || ext === '???') {
            ext = extname(file.name).replaceAll('.', '');
        }
        const mapped = MAPPING.get(ext);
        if (mapped) {
            ext = mapped;
        }
        ext = ext.toLocaleLowerCase();
        const mimeType = mimeTypeOut.trim();
        return {
            ext,
            mimeType,
        };
    }
    async call(field, input) {
        const res = await this.shellCommandExecutor.exec({
            bin: 'file',
            opts: {
                args: ['-b', `--${field}`, '-'],
                stdin: input,
            },
        });
        // It sends some errors to stdout...
        if (res.includes('cannot')) {
            throw new Error(res);
        }
        return res;
    }
};
NodeFileBinFileMetadataManager = __decorate([
    injectable(),
    __param(0, inject('ShellCommandExecutor')),
    __metadata("design:paramtypes", [Object])
], NodeFileBinFileMetadataManager);
export { NodeFileBinFileMetadataManager };
