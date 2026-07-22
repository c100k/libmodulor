var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FakeRandManager_1;
import { injectable } from 'inversify';
let FakeRandManager = class FakeRandManager {
    static { FakeRandManager_1 = this; }
    static SEED = 12893467;
    number() {
        // Mulberry32
        let t = FakeRandManager_1.SEED + 0x6d2b79f5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
};
FakeRandManager = FakeRandManager_1 = __decorate([
    injectable()
], FakeRandManager);
export { FakeRandManager };
