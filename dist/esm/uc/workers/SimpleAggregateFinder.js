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
import { NotFoundError } from '../../error/index.js';
let SimpleAggregateFinder = class SimpleAggregateFinder {
    ucDataStore;
    constructor(ucDataStore) {
        this.ucDataStore = ucDataStore;
    }
    async exec({ add, aggregateId, remove }) {
        const { records } = await this.ucDataStore.read({
            filters: {
                aggregateId,
                name: [add.name, ...remove.map((r) => r.name)],
            },
        });
        if (records.length > 1) {
            throw new NotFoundError();
        }
        if (records.length === 0) {
            throw new NotFoundError();
        }
        const record = records[0];
        if (!record) {
            throw new NotFoundError();
        }
        return { record };
    }
};
SimpleAggregateFinder = __decorate([
    injectable(),
    __param(0, inject('UCDataStore')),
    __metadata("design:paramtypes", [Object])
], SimpleAggregateFinder);
export { SimpleAggregateFinder };
