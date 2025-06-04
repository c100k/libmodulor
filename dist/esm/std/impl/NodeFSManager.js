var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { appendFile, chmod, cp, mkdir, readdir, readFile, rm, stat, writeFile, } from 'node:fs/promises';
import { extname, join, parse } from 'node:path';
import { injectable } from 'inversify';
import { FSManagerItemInfoType, } from '../FSManager.js';
let NodeFSManager = class NodeFSManager {
    async canHandleFiles() {
        return true;
    }
    async cat(path, opts) {
        // Be careful : omitting to pass an encoding makes it return a Buffer and not a string
        // This can be problematic in some callers, manipulating the file as a string (e.g. startsWith, includes, etc.)
        // So make sure to fallback on a default encoding
        return readFile(path, opts?.encoding ?? 'utf8');
    }
    async chmod(path, mode) {
        return chmod(path, mode);
    }
    async cp(src, dest) {
        await cp(src, dest, { recursive: true });
    }
    async echoIn(src, content) {
        await appendFile(src, content);
    }
    async exists(path) {
        // Before, we could use fs.exists(path) but it's been deprecated : @deprecated since v1.0.0 Use `fs.stat()` or `fs.access()` instead
        // Both functions are very unpractical to use because we need to wrap everything in a try/catch. It's too verbose !
        try {
            await stat(path);
            return true;
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return false;
        }
    }
    fileExtension(fileName) {
        return extname(fileName)
            .replace('.', '')
            .toLowerCase();
    }
    async info(path) {
        const parsedPath = parse(path);
        const stats = await stat(path);
        const { birthtime, size } = stats;
        // For now there is nothing in the standard library to detect it.
        // There are 3rd party packages like mime, mime-type, etc. but we prefer
        // limiting the external dependencies.
        // One can also call `file -b --mime-type /some/path` via exec/spawn if their
        // system has this utility.
        const mimeType = null;
        const type = this.determineType(stats);
        return {
            ...parsedPath,
            birthtime: birthtime.toISOString(),
            mimeType,
            size,
            type,
        };
    }
    async ls(path, opts) {
        const items = await readdir(path, {
            recursive: opts?.recursive,
            withFileTypes: true,
        });
        return items.map((item) => ({
            path: opts?.withFullPath
                ? this.path(item.parentPath, item.name)
                : item.name,
            type: this.determineType(item),
        }));
    }
    async mkdir(path, opts) {
        await mkdir(path, { recursive: opts?.recursive });
    }
    path(...parts) {
        return join(...parts);
    }
    async pickFiles(source, opts) {
        const validSources = ['path'];
        if (!validSources.includes(source)) {
            throw new Error(`You cannot pick a file via ${source}`);
        }
        const path = opts?.path;
        if (!path) {
            return [];
        }
        switch (source) {
            case 'path': {
                const { base: name, mimeType: type } = await this.info(path);
                if (!type) {
                    return [];
                }
                return [
                    {
                        name,
                        path,
                        type,
                    },
                ];
            }
            case 'camera':
            case 'library':
                return [];
            default:
                ((_) => { })(source);
                return [];
        }
    }
    async rm(path) {
        await rm(path, { recursive: true });
    }
    async touch(path, content) {
        await writeFile(path, content instanceof ArrayBuffer ? Buffer.from(content) : content);
    }
    determineType(stats) {
        if (stats.isDirectory()) {
            return FSManagerItemInfoType.DIR;
        }
        if (stats.isFile()) {
            return FSManagerItemInfoType.FILE;
        }
        return FSManagerItemInfoType.OTHER;
    }
};
NodeFSManager = __decorate([
    injectable()
], NodeFSManager);
export { NodeFSManager };
