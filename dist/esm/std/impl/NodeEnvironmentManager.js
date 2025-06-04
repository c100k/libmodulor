var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { homedir, type } from 'node:os';
import { injectable } from 'inversify';
let NodeEnvironmentManager = class NodeEnvironmentManager {
    cwd() {
        return process.cwd();
    }
    env(name) {
        return process.env[name];
    }
    home() {
        return homedir();
    }
    isProd() {
        // biome-ignore lint/complexity/useLiteralKeys: typescript disagrees
        return process.env['NODE_ENV'] === 'production';
    }
    type() {
        return type().toLowerCase();
    }
};
NodeEnvironmentManager = __decorate([
    injectable()
], NodeEnvironmentManager);
export { NodeEnvironmentManager };
