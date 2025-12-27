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
import { APPS_ROOT_PATH, PRODUCTS_ROOT_PATH } from '../../../../convention.js';
import { TBoolean, TDirPath, TFileName, TFreeTextShort, TSlug, } from '../../../../dt/index.js';
import { IllegalArgumentError } from '../../../../error/index.js';
import { EverybodyUCPolicy, } from '../../../../uc/index.js';
import { successMessage } from '../lib/funcs.js';
import { files } from '../lib/layers/project.js';
import { SrcFilesGenerator } from '../lib/SrcFilesGenerator.js';
import { Manifest } from '../manifest.js';
let CreateProjectClientMain = class CreateProjectClientMain {
    fsManager;
    logger;
    shellCommandExecutor;
    srcFilesGenerator;
    rootPath;
    constructor(fsManager, logger, shellCommandExecutor, srcFilesGenerator) {
        this.fsManager = fsManager;
        this.logger = logger;
        this.shellCommandExecutor = shellCommandExecutor;
        this.srcFilesGenerator = srcFilesGenerator;
    }
    async exec({ uc }) {
        const initialCommit = uc.reqVal0('initialCommit');
        const outPath = uc.reqVal0('outPath');
        const pkgManagerBin = uc.reqVal0('pkgManagerBin');
        const projectName = uc.reqVal0('projectName');
        const scmBin = uc.reqVal0('scmBin');
        const verbose = uc.reqVal0('verbose');
        await this.assertBinPresence(pkgManagerBin);
        await this.assertBinPresence(scmBin);
        this.rootPath = this.fsManager.path(outPath, projectName);
        // TODO : Rollback the whole thing in case of failure
        await this.createRootDir();
        await this.initRepository(scmBin, verbose);
        await this.srcFilesGenerator.exec({
            files: files(projectName),
            rootPath: this.rootPath,
        });
        await this.createDirs();
        await this.installDeps(pkgManagerBin, verbose);
        await this.commit(scmBin, initialCommit, verbose);
        await this.runDevCmds(pkgManagerBin, verbose);
        this.logger.info(successMessage('Project'));
    }
    async assertBinPresence(bin) {
        try {
            await this.shellCommandExecutor.exec({
                bin: bin,
                opts: { args: ['--version'] },
            });
        }
        catch (_err) {
            throw new IllegalArgumentError(`'${bin}' seems missing. Is it installed on your machine ?`);
        }
    }
    async commit(scmBin, initialCommit, verbose) {
        this.logger.info('Committing');
        const cmdArgs = [
            ['branch', '-M', 'master'],
            ['add', '.'],
            ['commit', '-am', initialCommit],
        ];
        for await (const args of cmdArgs) {
            await this.shellCommandExecutor.exec({
                bin: scmBin,
                opts: { args, cwd: this.rootPath, streamData: verbose },
            });
        }
    }
    async createDirs() {
        this.logger.info('Creating apps and products directories');
        const dirs = [APPS_ROOT_PATH, PRODUCTS_ROOT_PATH];
        for await (const dirPath of dirs) {
            const path = this.fsManager.path(this.rootPath, ...dirPath);
            await this.fsManager.mkdir(path, { recursive: true });
            await this.fsManager.touch(this.fsManager.path(path, '.gitkeep'), '');
        }
    }
    async createRootDir() {
        this.logger.info('Creating root dir : %s', this.rootPath);
        await this.fsManager.mkdir(this.rootPath, { recursive: true });
    }
    async initRepository(scmBin, verbose) {
        const cmd = 'init';
        this.logger.info('Initializing repository : %s %s', scmBin, cmd);
        await this.shellCommandExecutor.exec({
            bin: scmBin,
            opts: { args: [cmd], cwd: this.rootPath, streamData: verbose },
        });
    }
    async installDeps(pkgManagerBin, verbose) {
        const cmd = 'install';
        this.logger.info('Installing dependencies : %s %s', pkgManagerBin, cmd);
        await this.shellCommandExecutor.exec({
            bin: pkgManagerBin,
            opts: { args: [cmd], cwd: this.rootPath, streamData: verbose },
        });
    }
    async runDevCmds(pkgManagerBin, verbose) {
        const cmd = 'run';
        const scripts = ['lint', 'test'];
        for await (const script of scripts) {
            this.logger.info('Running dev command : %s %s %s', pkgManagerBin, cmd, script);
            await this.shellCommandExecutor.exec({
                bin: pkgManagerBin,
                opts: {
                    args: [cmd, script],
                    cwd: this.rootPath,
                    streamData: verbose,
                },
            });
        }
    }
};
CreateProjectClientMain = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('Logger')),
    __param(2, inject('ShellCommandExecutor')),
    __param(3, inject(SrcFilesGenerator)),
    __metadata("design:paramtypes", [Object, Object, Object, SrcFilesGenerator])
], CreateProjectClientMain);
export const CreateProjectUCD = {
    ext: {
        cmd: {
            mountAt: 'CreateProject',
        },
    },
    io: {
        i: {
            fields: {
                initialCommit: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TFreeTextShort()
                        .setDefaultValue('chore: initial commit')
                        .setExamples(['chore: initial commit']),
                },
                outPath: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TDirPath()
                        .setDefaultValue('./')
                        .setExamples([['~', 'Desktop'].join('/')]),
                },
                pkgManagerBin: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TFileName()
                        .setDefaultValue('pnpm')
                        .setExamples(['bun', 'npm', 'pnpm', 'yarn']),
                },
                projectName: {
                    type: new TSlug(),
                },
                scmBin: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TFileName()
                        .setDefaultValue('git')
                        .setExamples(['git']),
                },
                verbose: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TBoolean().setDefaultValue(false),
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: CreateProjectClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.CreateProject,
};
