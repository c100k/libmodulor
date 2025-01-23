var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import { ForbiddenAsNotFoundError } from '../../error/index.js';
let SimpleAggregateOwnershipChecker = class SimpleAggregateOwnershipChecker {
    async exec({ record, scope = ['organization', 'user'], uc, }) {
        const { auth } = uc;
        if (this.checkOrg(scope)) {
            const organizationId = auth?.organization.id;
            if (!organizationId || record.organizationId !== organizationId) {
                throw new ForbiddenAsNotFoundError();
            }
        }
        if (this.checkUser(scope)) {
            const userId = auth?.user.id;
            if (!userId || record.userId !== userId) {
                throw new ForbiddenAsNotFoundError();
            }
        }
    }
    checkOrg(scope) {
        return scope === undefined || scope.includes('organization');
    }
    checkUser(scope) {
        return scope === undefined || scope.includes('user');
    }
};
SimpleAggregateOwnershipChecker = __decorate([
    injectable()
], SimpleAggregateOwnershipChecker);
export { SimpleAggregateOwnershipChecker };
