var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
let StdDateClockManager = class StdDateClockManager {
    now() {
        return new Date();
    }
    nowToKey() {
        // The rationale behind this being hardcoded is to avoid adding a library (luxon, date-fns) just for that.
        // For instance, luxon adds a huge amount of code to a basic web target when bundled, for nothing.
        // See https://github.com/moment/luxon/issues/854#issuecomment-1729384672
        return this.now()
            .toISOString()
            .replaceAll(/-|T|:/g, '')
            .split('.')[0];
    }
    time() {
        return Math.round(this.now().getTime() / 1000);
    }
};
StdDateClockManager = __decorate([
    injectable()
], StdDateClockManager);
export { StdDateClockManager };
