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
import { rValArr } from '../utils/rVal.js';
let UCOutputFilesProcessor = class UCOutputFilesProcessor {
    fsManager;
    settingsManager;
    constructor(fsManager, settingsManager) {
        this.fsManager = fsManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            uc_file_ref_prefix: this.settingsManager.get()('uc_file_ref_prefix'),
            uc_files_directory_path: this.settingsManager.get()('uc_files_directory_path'),
        };
    }
    async exec({ files, keepOnlyFileName }) {
        const output = {
            filePaths: [],
        };
        if (!files) {
            return output;
        }
        const fileNameRefs = rValArr(files);
        output.filePaths = await Promise.all(fileNameRefs.map(async (fileNameRef) => {
            let filePath;
            if (typeof fileNameRef === 'string') {
                const fileName = fileNameRef.replace(this.s().uc_file_ref_prefix, '');
                filePath = this.fsManager.path(this.s().uc_files_directory_path, fileName);
            }
            else {
                filePath = fileNameRef.path;
            }
            if (keepOnlyFileName) {
                const { base } = await this.fsManager.info(filePath);
                return `/${base}`;
            }
            return filePath;
        }));
        return output;
    }
};
UCOutputFilesProcessor = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], UCOutputFilesProcessor);
export { UCOutputFilesProcessor };
