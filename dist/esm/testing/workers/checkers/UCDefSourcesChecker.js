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
import { APP_SRC_DIR_NAME, APP_SRC_UCDS_DIR_NAME, UC_DEF_FILE_NAME_SUFFIX, UC_DEF_SUFFIX, UC_INPUT_FIELD_PATTERN, UC_INPUT_SUFFIX, UC_OPI_SUFFIX, UC_POLICY_SUFFIX_FULL, } from '../../../convention.js';
import { optsAllSet } from '../../opts.js';
import { initOutputItem, } from '../../UCDefASTParser.js';
const ERR_UCD_CONST_NAME = (name) => `The UCD const name '${name}' must follow the convention`;
const ERR_UCD_FILE_SUFFIX = (fileName) => `The file '${fileName}' must end with ${UC_DEF_FILE_NAME_SUFFIX}`;
const ERR_UCD_IMPORTS_EXTERNAL_ALLOWED = (aliasPrefix, allowed, text) => `External imports must be an alias '${aliasPrefix}*' or be one of ${allowed} (Got ${text})`;
const ERR_UCD_IMPORTS_INTERNAL_MAX_DEPTH = (maxDepth) => `Internal imports must not be deeper than ${maxDepth}`;
const ERR_UCD_INPUT_FIELD_DECLARATION = (raw) => `The input field def must match 'name: UCInputFieldValue<DataType>' (Got '${raw}')`;
const ERR_UCD_INPUT_TYPE_NAME = (ucName) => `The input type must be named ${ucName}${UC_INPUT_SUFFIX}`;
const ERR_UCD_OPI_TYPE_NAME = (ucName, idx) => `The OPI must be named ${ucName}${UC_OPI_SUFFIX}${idx}`;
// TODO : Improve the check* methods that look a little bit hacky
let UCDefSourcesChecker = class UCDefSourcesChecker {
    fsManager;
    logger;
    ucDefASTParser;
    opts;
    output;
    constructor(fsManager, logger, ucDefASTParser) {
        this.fsManager = fsManager;
        this.logger = logger;
        this.ucDefASTParser = ucDefASTParser;
        this.output = {
            items: [],
        };
    }
    async exec({ ctx }) {
        const { appPath, opts } = ctx;
        // TODO : Consider removing this and using profiling when needed
        const startTime = Date.now();
        this.logger.debug('UCDefSourceChecker starting', {
            appPath,
            startTime,
        });
        this.opts = optsAllSet(opts);
        const ucdsPaths = this.ucdsAbsolutePaths(ctx);
        this.logger.debug('UCDefSourceChecker initializing');
        await this.ucDefASTParser.init(this.opts, ucdsPaths);
        this.logger.debug('UCDefSourceChecker transpiling');
        await this.ucDefASTParser.transpile();
        this.logger.debug('UCDefSourceChecker processing files');
        this.output.items = await this.processFiles(appPath, ucdsPaths);
        const duration = Date.now() - startTime;
        this.logger.debug('UCDefSourceChecker done', {
            appPath,
            duration: `${duration} ms`,
        });
        return this.output;
    }
    checkConstName(name, item) {
        item.constName = {
            err: name.endsWith(UC_DEF_SUFFIX) ? null : ERR_UCD_CONST_NAME(name),
            value: name,
        };
    }
    checkImport(name, item) {
        const { external, internal } = this.opts.source.imports;
        const isInternal = name.startsWith(internal.startChar);
        if (isInternal) {
            const { maxDepth } = internal;
            item.internalImports?.push({
                err: !name.startsWith(maxDepth)
                    ? null
                    : ERR_UCD_IMPORTS_INTERNAL_MAX_DEPTH(maxDepth),
                value: name,
            });
            return;
        }
        const { aliasPrefix, allowed } = external;
        item.externalImports?.push({
            err: name.startsWith(aliasPrefix) || allowed.includes(name)
                ? null
                : ERR_UCD_IMPORTS_EXTERNAL_ALLOWED(aliasPrefix, allowed, name),
            value: name,
        });
    }
    checkInputType(name, fields, item) {
        item.ioI = {
            err: null,
            value: name,
        };
        item.ioIFields = fields;
        for (const f of item.ioIFields) {
            const { dataType, name, raw, type } = f.value;
            if (dataType &&
                name &&
                raw &&
                type &&
                type.match(new RegExp(UC_INPUT_FIELD_PATTERN)) !== null) {
            }
            else {
                f.err = ERR_UCD_INPUT_FIELD_DECLARATION(raw);
            }
        }
    }
    checkMainStep(lifecycle, step, item) {
        switch (lifecycle) {
            case 'client':
                if (!item.lifecycleClientSteps) {
                    item.lifecycleClientSteps = [];
                }
                item.lifecycleClientSteps.push({ err: null, value: step });
                break;
            case 'server':
                if (!item.lifecycleServerSteps) {
                    item.lifecycleServerSteps = [];
                }
                item.lifecycleServerSteps.push({ err: null, value: step });
                break;
            default:
                lifecycle;
        }
    }
    checkMetadata(metadata, item) {
        item.metadataAction = {
            err: null,
            value: metadata.action,
        };
        item.metadataBeta = {
            err: null,
            value: metadata.beta?.toString() ?? '',
        };
        item.metadataIcon = {
            err: null,
            value: metadata.icon,
        };
        item.metadataName = {
            err: null,
            value: metadata.name,
        };
        item.metadataNew = {
            err: null,
            value: metadata.new?.toString() ?? '',
        };
        item.metadataSensitive = {
            err: null,
            value: metadata.sensitive?.toString() ?? '',
        };
    }
    checkOPIType(name, fields, idx, item) {
        const key = `ioOPI${idx}`;
        item[key] = {
            err: null,
            value: name,
        };
        const fieldsKey = `${key}Fields`;
        item[fieldsKey] = fields;
        for (const f of item[fieldsKey]) {
            // There are no specific validation rules for OPIx for now
            f.err = null;
        }
    }
    checkPolicy(lifecycle, name, item) {
        switch (lifecycle) {
            case 'client':
                item.lifecycleClientPolicy = {
                    err: null,
                    value: name.replaceAll(UC_POLICY_SUFFIX_FULL, ''),
                };
                break;
            case 'server':
                item.lifecycleServerPolicy = {
                    err: null,
                    value: name.replaceAll(UC_POLICY_SUFFIX_FULL, ''),
                };
                break;
            default:
                lifecycle;
        }
    }
    async processFiles(appPath, paths) {
        const res = await Promise.all(paths.map(async (path) => {
            const item = initOutputItem();
            this.logger.trace('UCDefSourceChecker processing file', {
                path,
            });
            await this.ucDefASTParser.processFile(path, (name) => this.checkImport(name, item), (name) => this.checkConstName(name, item), (name, fields) => this.checkInputType(name, fields, item), (name, fields, idx) => this.checkOPIType(name, fields, idx, item), (lifecycle, step) => this.checkMainStep(lifecycle, step, item), (lifecycle, name) => this.checkPolicy(lifecycle, name, item), (value) => this.checkMetadata(value, item));
            const relativePath = path.replaceAll(appPath, '');
            item.filePath = {
                err: relativePath.endsWith(UC_DEF_FILE_NAME_SUFFIX)
                    ? null
                    : ERR_UCD_FILE_SUFFIX(relativePath),
                value: relativePath,
            };
            if (item.ioI) {
                item.ioI.err =
                    item.ioI.value ===
                        `${item.metadataName?.value}${UC_INPUT_SUFFIX}`
                        ? null
                        : ERR_UCD_INPUT_TYPE_NAME(item.metadataName?.value ?? '-');
            }
            if (item.ioOPI0) {
                item.ioOPI0.err =
                    item.ioOPI0.value ===
                        `${item.metadataName?.value}${UC_OPI_SUFFIX}0`
                        ? null
                        : ERR_UCD_OPI_TYPE_NAME(item.metadataName?.value ?? '-', 0);
            }
            if (item.ioOPI1) {
                item.ioOPI1.err =
                    item.ioOPI1.value ===
                        `${item.metadataName?.value}${UC_OPI_SUFFIX}1`
                        ? null
                        : ERR_UCD_OPI_TYPE_NAME(item.metadataName?.value ?? '-', 1);
            }
            return item;
        }));
        const errors = [];
        for (const analysis of res) {
            for (const [_k, analysisVal] of Object.entries(analysis)) {
                if (!analysisVal) {
                    continue;
                }
                const asArr = Array.isArray(analysisVal)
                    ? analysisVal
                    : [analysisVal];
                for (const val of asArr) {
                    const { err } = val;
                    if (err) {
                        errors.push(err);
                    }
                }
            }
        }
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
        return res;
    }
    ucdsAbsolutePaths(ctx) {
        return ctx.ucdRefs.map(({ fileName }) => this.fsManager.path(ctx.appPath, APP_SRC_DIR_NAME, APP_SRC_UCDS_DIR_NAME, fileName));
    }
};
UCDefSourcesChecker = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('Logger')),
    __param(2, inject('UCDefASTParser')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UCDefSourcesChecker);
export { UCDefSourcesChecker };
