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
import { APP_SRC_DIR_NAME } from '../../../convention.js';
const ERR_MANIFEST_UCDS_MISMATCH = () => `The app manifest must list the use cases the same way as the file system in ${APP_SRC_DIR_NAME}`;
let AppManifestChecker = class AppManifestChecker {
    output;
    constructor() {
        this.output = { errors: [] };
    }
    async exec({ appManifest, ucdRefs }) {
        this.makeSureUCsAreConsistent(appManifest, ucdRefs);
        return this.output;
    }
    makeSureUCsAreConsistent(appManifest, ucdRefs) {
        const inManifest = Object.keys(appManifest.ucReg);
        const inUCDefs = ucdRefs.map((ucdRef) => ucdRef.name);
        if (inManifest.join() !== inUCDefs.join()) {
            this.output.errors.push(ERR_MANIFEST_UCDS_MISMATCH());
        }
    }
};
AppManifestChecker = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], AppManifestChecker);
export { AppManifestChecker };
