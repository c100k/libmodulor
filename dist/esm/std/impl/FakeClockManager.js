var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import { StdDateClockManager } from './StdDateClockManager.js';
// We set now as this specific value to make tests deterministic
export const FAKE_CLOCK_MANAGER_NOW = '2022-05-15T20:23:30.123Z';
let FakeClockManager = class FakeClockManager extends StdDateClockManager {
    now() {
        return new Date(Date.parse(FAKE_CLOCK_MANAGER_NOW));
    }
};
FakeClockManager = __decorate([
    injectable()
], FakeClockManager);
export { FakeClockManager };
