var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
let WebFSManager = class WebFSManager {
    async canHandleFiles() {
        return true;
    }
    async cat(_path, _opts) {
        throw new Error('Not available on this platform');
    }
    async chmod(_path, _mode) {
        throw new Error('Not available on this platform');
    }
    async cp(_src, _dest) {
        throw new Error('Not available on this platform');
    }
    async echoIn(_src, _content) {
        throw new Error('Not available on this platform');
    }
    async exists(_path) {
        throw new Error('Not available on this platform');
    }
    fileExtension(_fileName) {
        throw new Error('Not available on this platform');
    }
    async info(_path) {
        throw new Error('Not available on this platform');
    }
    async ls(_path, _opts) {
        throw new Error('Not available on this platform');
    }
    async mkdir(_path, _opts) {
        throw new Error('Not available on this platform');
    }
    path(..._parts) {
        throw new Error('Not available on this platform');
    }
    async pickFiles(_source, _opts) {
        throw new Error('Not available on this platform');
    }
    async rm(_path) {
        throw new Error('Not available on this platform');
    }
    async touch(_path, _content) {
        throw new Error('Not available on this platform');
    }
};
WebFSManager = __decorate([
    injectable()
], WebFSManager);
export { WebFSManager };
