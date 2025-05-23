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
import { TFile } from '../../dt/index.js';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../input-field.js';
import { rVal0, rValArr } from '../utils/rVal.js';
let UCInputFilesProcessor = class UCInputFilesProcessor {
    clockManager;
    cryptoManager;
    fsManager;
    settingsManager;
    constructor(clockManager, cryptoManager, fsManager, settingsManager) {
        this.clockManager = clockManager;
        this.cryptoManager = cryptoManager;
        this.fsManager = fsManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            uc_file_ref_prefix: this.settingsManager.get()('uc_file_ref_prefix'),
            uc_files_directory_path: this.settingsManager.get()('uc_files_directory_path'),
        };
    }
    async exec({ uc }) {
        const canHandleFiles = await this.fsManager.canHandleFiles();
        if (!canHandleFiles) {
            return;
        }
        const fileFields = uc.inputFields.filter((f) => f.def.type instanceof TFile);
        for await (const field of fileFields) {
            const [isRepeatable] = ucifRepeatability(field.def);
            if (isRepeatable) {
                const files = rValArr(field.getValue());
                const fileNameRefs = await Promise.all(files.map(async (f) => this.processFile(f)));
                // Although the field is a file, here we fill it with the refs (for persistence)
                // TODO : Improve the mgmt of FileNameRef vs actual File at the use case level
                // I think we need to introduce another value, something like `setValueSerialized` or similar.
                field.setValue(UCInputFieldChangeOperator.SET, fileNameRefs);
            }
            else {
                const file = rVal0(field.getValue());
                if (file) {
                    const fileNameRef = await this.processFile(file);
                    field.setValue(UCInputFieldChangeOperator.SET, fileNameRef);
                }
            }
        }
    }
    async processFile(file) {
        const extension = this.fsManager.fileExtension(file.name); // => jpg
        const prefix = this.clockManager.nowToKey();
        const fileName = `${prefix}-${this.cryptoManager.randomUUID()}.${extension}`; // => 20230110143732-155eb8d3-9af5-430e-b856-248007859df1.jpg
        const fileNameRef = `${this.s().uc_file_ref_prefix}${fileName}`; // => $ref:20230110143732-155eb8d3-9af5-430e-b856-248007859df1.jpg
        const destPath = this.fsManager.path(this.s().uc_files_directory_path, fileName); // => /path/to/files/20230110143732-155eb8d3-9af5-430e-b856-248007859df1.jpg
        if (file instanceof File) {
            await this.fsManager.touch(destPath, await file.arrayBuffer());
        }
        else {
            const { path } = file;
            await this.fsManager.cp(path, destPath);
            await this.fsManager.rm(path);
        }
        return fileNameRef;
    }
};
UCInputFilesProcessor = __decorate([
    injectable(),
    __param(0, inject('ClockManager')),
    __param(1, inject('CryptoManager')),
    __param(2, inject('FSManager')),
    __param(3, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UCInputFilesProcessor);
export { UCInputFilesProcessor };
