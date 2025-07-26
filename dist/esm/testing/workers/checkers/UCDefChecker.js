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
import { UC_DEF_FILE_NAME_SUFFIX, UC_DEF_SUFFIX } from '../../../convention.js';
const ERR_UCD_EXPORT_ONLY = (fileName) => `${fileName} must export only the I/OPI types and the UCD. Make sure the client/server classes are not exported`;
const ERR_UCD_SUFFIX = (fileName) => `${fileName} use case def must end with '${UC_DEF_SUFFIX}'`;
const ERR_UCD_NAMES = (fileName, name, ucdKey) => `The file name and the const name must be the same as the name, prefixed with '${UC_DEF_SUFFIX}' (Got ${fileName} vs ${name} vs ${ucdKey})`;
let UCDefChecker = class UCDefChecker {
    output;
    constructor() {
        this.output = { errors: [], ucd: null };
    }
    async exec({ ucdRef }) {
        const { fileName, source } = ucdRef;
        const keys = Object.keys(source);
        if (keys.length !== 1) {
            this.output.errors.push(ERR_UCD_EXPORT_ONLY(fileName));
            return this.output;
        }
        const [ucdKey] = keys;
        if (!ucdKey?.endsWith(UC_DEF_SUFFIX)) {
            this.output.errors.push(ERR_UCD_SUFFIX(fileName));
            return this.output;
        }
        const ucd = source[ucdKey];
        const { metadata: { name }, } = ucd;
        if (name !== fileName.replaceAll(UC_DEF_FILE_NAME_SUFFIX, '') ||
            name !== ucdKey.replaceAll(UC_DEF_SUFFIX, '')) {
            this.output.errors.push(ERR_UCD_NAMES(fileName, name, ucdKey));
        }
        if (this.output.errors.length === 0) {
            this.output.ucd = ucd;
        }
        return this.output;
    }
};
UCDefChecker = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], UCDefChecker);
export { UCDefChecker };
