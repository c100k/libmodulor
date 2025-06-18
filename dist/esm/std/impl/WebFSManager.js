var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import { NotAvailableError } from '../../error/index.js';
let WebFSManager = class WebFSManager {
    async canHandleFiles() {
        return false;
    }
    async cat(_path, _opts) {
        throw new NotAvailableError('cat');
    }
    async chmod(_path, _mode) {
        throw new NotAvailableError('chmod');
    }
    async cp(_src, _dest) {
        throw new NotAvailableError('cp');
    }
    async echoIn(_src, _content) {
        throw new NotAvailableError('echoIn');
    }
    async exists(_path) {
        throw new NotAvailableError('exists');
    }
    fileExtension(_fileName) {
        throw new NotAvailableError('fileExtension');
    }
    async info(_path) {
        throw new NotAvailableError('info');
    }
    async ls(_path, _opts) {
        throw new NotAvailableError('ls');
    }
    async mkdir(_path, _opts) {
        throw new NotAvailableError('mkdir');
    }
    path(..._parts) {
        throw new NotAvailableError('path');
    }
    async pickFiles(_source, _opts) {
        throw new NotAvailableError('pickFiles');
    }
    async rm(_path) {
        throw new NotAvailableError('rm');
    }
    async touch(_path, _content) {
        throw new NotAvailableError('touch');
    }
};
WebFSManager = __decorate([
    injectable()
], WebFSManager);
export { WebFSManager };
