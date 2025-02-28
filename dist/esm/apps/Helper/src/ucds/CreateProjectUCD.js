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
import { TDirPath, TSlug, } from '../../../../dt/index.js';
import { EverybodyUCPolicy, } from '../../../../uc/index.js';
import { projectFiles } from '../lib/project.js';
import { Manifest } from '../manifest.js';
let CreateProjectClientMain = class CreateProjectClientMain {
    fsManager;
    logger;
    shellCommandExecutor;
    constructor(fsManager, logger, shellCommandExecutor) {
        this.fsManager = fsManager;
        this.logger = logger;
        this.shellCommandExecutor = shellCommandExecutor;
    }
    async exec({ uc }) {
        const outPath = uc.reqVal0('outPath');
        const projectName = uc.reqVal0('projectName');
        const cwd = this.fsManager.path(outPath, projectName);
        this.logger.info('Creating root dir : %s', cwd);
        await this.fsManager.mkdir(cwd, { recursive: true });
        this.logger.info('Initializing git repository');
        await this.shellCommandExecutor.exec({
            bin: 'git',
            opts: { args: ['init'], cwd },
        });
        this.logger.info('Creating config files');
        const files = projectFiles(projectName);
        for await (const [fileName, content] of files) {
            const path = this.fsManager.path(cwd, fileName);
            await this.fsManager.touch(path, content);
        }
        const dirs = [APPS_ROOT_PATH, PRODUCTS_ROOT_PATH];
        this.logger.info('Creating apps and products directories');
        for await (const dirPath of dirs) {
            const path = this.fsManager.path(cwd, ...dirPath);
            await this.fsManager.mkdir(path, { recursive: true });
            await this.fsManager.touch(this.fsManager.path(path, '.gitkeep'), '');
        }
        this.logger.info('Installing dependencies');
        await this.shellCommandExecutor.exec({
            bin: 'yarn',
            opts: { args: ['install'], cwd },
        });
        this.logger.info('Committing');
        const cmdArgs = [
            ['branch', '-M', 'master'],
            ['add', '.'],
            ['commit', '-am', '"chore: initial commit"'],
        ];
        for await (const args of cmdArgs) {
            await this.shellCommandExecutor.exec({
                bin: 'git',
                opts: { args, cwd },
            });
        }
        const devCmds = ['lint', 'test'];
        for await (const cmd of devCmds) {
            this.logger.info('Testing dev command : yarn %s', cmd);
            await this.shellCommandExecutor.exec({
                bin: 'yarn',
                opts: { args: [cmd], cwd },
            });
        }
        this.logger.info('Done ! Project ready ! ✅ 🚀');
    }
};
CreateProjectClientMain = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('Logger')),
    __param(2, inject('ShellCommandExecutor')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateProjectClientMain);
export { CreateProjectClientMain };
export const CreateProjectUCD = {
    ext: {
        cmd: {
            mountAt: 'CreateProject',
        },
    },
    io: {
        i: {
            fields: {
                outPath: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TDirPath()
                        .setDefaultValue('./')
                        .setExamples([['~', 'Desktop'].join('/')]),
                },
                projectName: {
                    type: new TSlug(),
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
