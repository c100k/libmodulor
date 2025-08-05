var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Blob } from 'node:buffer';
import { createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { injectable } from 'inversify';
let NodeFormDataBuilder = class NodeFormDataBuilder {
    async append(fd, key, val) {
        const isFile = typeof val === 'object' && val !== null && 'uri' in val;
        if (isFile) {
            const rs = createReadStream(val.uri);
            const chunks = [];
            await new Promise((resolve, reject) => {
                rs.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                rs.on('end', () => {
                    fd.append(key, 
                    // @ts-ignore
                    new Blob(chunks, { type: val.type }), basename(val.uri));
                    resolve(null);
                });
                rs.on('error', (err) => {
                    reject(err);
                });
            });
            return;
        }
        fd.append(key, val);
    }
};
NodeFormDataBuilder = __decorate([
    injectable()
], NodeFormDataBuilder);
export { NodeFormDataBuilder };
