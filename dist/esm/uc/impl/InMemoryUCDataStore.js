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
const ERR = 'Method not implemented.';
function predicate(key, filter) {
    if (filter === null) {
        return (r) => r[key] === null;
    }
    if (Array.isArray(filter)) {
        return (r) => r[key] !== null && filter.includes(r[key]);
    }
    return (r) => r[key] === filter;
}
let InMemoryUCDataStore = class InMemoryUCDataStore {
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    entries;
    tx;
    constructor() {
        this.entries = [];
    }
    async clear() {
        this.entries = [];
    }
    async destroy() {
        this.entries = [];
    }
    async exists() {
        return this.entries.length > 0;
    }
    async initTx() {
        this.tx = 'pending';
        return {
            commit: async () => {
                this.tx = 'committed';
            },
            rollback: async () => {
                this.tx = 'rollbacked';
                this.entries = [];
            },
        };
    }
    async install() {
        // Nothing to do
    }
    async read(opts) {
        let items = this
            .entries;
        // Filter
        // Of course it handles only simple cases (eq X, is null, in) with the AND operator
        if (opts?.filters) {
            const { aggregateId, appName, name, organizationId, userId } = opts.filters;
            if (aggregateId !== undefined) {
                items = items.filter(predicate('aggregateId', aggregateId));
            }
            if (appName !== undefined) {
                items = items.filter(predicate('appName', appName));
            }
            if (name !== undefined) {
                items = items.filter(predicate('name', name));
            }
            if (organizationId !== undefined) {
                items = items.filter(predicate('organizationId', organizationId));
            }
            if (userId !== undefined) {
                items = items.filter(predicate('userId', userId));
            }
        }
        // Sort
        // => No need, we are processing them by order of insertion in the Map
        return {
            records: items,
        };
    }
    async readProjection() {
        return [];
    }
    supportedSpecificBindings() {
        return [];
    }
    async testKey() {
        // Nothing to do
    }
    async write(record) {
        this.writeBulk([record]);
    }
    async writeBulk(records) {
        this.entries.push(...records);
    }
    async writeProjection() {
        throw new Error(ERR);
    }
};
InMemoryUCDataStore = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], InMemoryUCDataStore);
export { InMemoryUCDataStore };
