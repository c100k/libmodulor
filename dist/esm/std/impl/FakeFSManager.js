var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from 'inversify';
import { NotImplementedError } from '../../error/index.js';
import { FSManagerItemInfoType, } from '../FSManager.js';
let FakeFSManager = class FakeFSManager {
    entries;
    constructor() {
        this.entries = new Map();
    }
    async clear() {
        this.entries = new Map();
    }
    async canHandleFiles() {
        return true;
    }
    async cat(path, _opts) {
        const value = this.entries.get(path);
        if (value === undefined) {
            throw new Error(`Cannot open file at ${path}`);
        }
        return value?.content;
    }
    async chmod(path, mode) {
        const value = this.entries.get(path);
        if (value) {
            value.mode = mode;
        }
    }
    async cp(src, dest) {
        this.entries.forEach((value, path) => {
            if (path.startsWith(src)) {
                const newPath = path.replace(src, dest);
                this.entries.set(newPath, value);
            }
        });
    }
    async echoIn(src, content) {
        this.entries.set(src, { content, mode: 0o755 });
    }
    async exists(_path) {
        return false;
    }
    fileExtension(fileName) {
        const nameParts = fileName.split('.');
        const extension = nameParts[nameParts.length - 1]?.toLowerCase();
        return extension;
    }
    async info(_path) {
        return {
            base: '',
            birthtime: '2024-06-03T16:03:00.000Z',
            dir: '',
            ext: '',
            mimeType: 'application/pdf',
            name: '',
            root: '',
            size: 123,
            type: FSManagerItemInfoType.FILE,
        };
    }
    async ls(path, _opts) {
        const files = [];
        this.entries.forEach((_, p) => {
            if (p.startsWith(path)) {
                files.push({
                    path: p,
                    type: FSManagerItemInfoType.FILE,
                });
            }
        });
        return files;
    }
    async mkdir(path) {
        this.entries.set(path, { content: '.', mode: 0o755 });
    }
    path(...parts) {
        const resolvedArgs = parts.flatMap((part) => part?.split('/'));
        while (resolvedArgs.includes('..')) {
            const index = resolvedArgs.indexOf('..');
            if (index > 0) {
                resolvedArgs.splice(index - 1, 2);
            }
        }
        return resolvedArgs.join('/');
    }
    async pickFiles() {
        throw new NotImplementedError('pickFiles');
    }
    async rm(path) {
        this.entries.delete(path);
    }
    async touch(path, content) {
        this.entries.set(path, { content, mode: 0o755 });
    }
};
FakeFSManager = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], FakeFSManager);
export { FakeFSManager };
