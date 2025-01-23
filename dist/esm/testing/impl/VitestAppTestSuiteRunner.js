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
import { createVitest } from 'vitest/node';
import { APP_TEST_DIR_NAME, APP_TEST_REPORTS_DIR_NAME, } from '../../convention.js';
let VitestAppTestSuiteRunner = class VitestAppTestSuiteRunner {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPath, skipCoverage, updateSnapshots, }) {
        const testPath = this.fsManager.path(appPath, APP_TEST_DIR_NAME);
        const excludePath = this.fsManager.path(testPath);
        const runner = await createVitest('test', {
            coverage: {
                enabled: !skipCoverage,
                exclude: [excludePath],
                include: [appPath],
                reportsDirectory: this.coverageReportPath(appPath),
                reportOnFailure: false,
            },
            dir: appPath,
            update: updateSnapshots,
            watch: false,
        });
        await runner.start();
    }
    async coverageReportEntrypointPath(appPath) {
        return this.fsManager.path(this.coverageReportPath(appPath), 'index.html');
    }
    coverageReportPath(appPath) {
        const testPath = this.fsManager.path(appPath, APP_TEST_DIR_NAME);
        return this.fsManager.path(testPath, APP_TEST_REPORTS_DIR_NAME, 'coverage');
    }
};
VitestAppTestSuiteRunner = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], VitestAppTestSuiteRunner);
export { VitestAppTestSuiteRunner };
