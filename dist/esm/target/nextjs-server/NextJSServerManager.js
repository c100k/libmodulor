var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
let NextJSServerManager = class NextJSServerManager {
    overrideUCManager(_ucManager) {
        // Nothing to do
    }
    async init() {
        // Nothing to do
    }
    async mount(_appManifest, _ucd, _contract) {
        // Nothing to do
    }
    async mountStaticDir(_dirPath) {
        // Nothing to do
    }
    async start() {
        // Nothing to do
    }
    async stop() {
        // Nothing to do
    }
    async warmUp() {
        // Nothing to do
    }
};
NextJSServerManager = __decorate([
    injectable()
], NextJSServerManager);
export { NextJSServerManager };
