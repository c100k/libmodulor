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
// TODO : Wait for the DB to be ready or add a retry mechanism
// Because when we start from a fresh install, this is executed before the docker container is ready
// A temporary workaround is to stop and restart everything. At the 2nd startup, the db is ready, and it works
let UCDataStoreExternalResourceManager = class UCDataStoreExternalResourceManager {
    ucDataStore;
    constructor(ucDataStore) {
        this.ucDataStore = ucDataStore;
    }
    async create() {
        return this.ucDataStore.install();
    }
    async delete() {
        return this.ucDataStore.destroy();
    }
    async exists() {
        return this.ucDataStore.exists();
    }
    name() {
        return 'data store';
    }
};
UCDataStoreExternalResourceManager = __decorate([
    injectable(),
    __param(0, inject('UCDataStore')),
    __metadata("design:paramtypes", [Object])
], UCDataStoreExternalResourceManager);
export { UCDataStoreExternalResourceManager };
