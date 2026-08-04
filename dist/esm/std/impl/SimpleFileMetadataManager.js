var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
let SimpleFileMetadataManager = class SimpleFileMetadataManager {
    async info(file) {
        const ext = this.ext(file);
        let mimeType = 'application/octet-stream';
        // TODO : Complete this with the most common extensions
        switch (ext) {
            case 'jpg':
                mimeType = 'image/jpg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
        }
        return {
            ext: this.ext(file),
            mimeType,
        };
    }
    ext(file) {
        const parts = file.name.split('.');
        const extension = parts[parts.length - 1]?.toLowerCase();
        return extension;
    }
};
SimpleFileMetadataManager = __decorate([
    injectable()
], SimpleFileMetadataManager);
export { SimpleFileMetadataManager };
