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
import { APP_TEST_DIR_NAME, APP_TEST_REPORTS_DIR_NAME, } from '../../convention.js';
let SimpleHTMLAppTestReportEmitter = class SimpleHTMLAppTestReportEmitter {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPath, testResults, testSummary, }) {
        const reportPath = this.reportPath(appPath);
        // Since we're using 'recursive: true', there will be no error if the directory already exists
        await this.fsManager.mkdir(reportPath, { recursive: true });
        const tpl = template(appPath, testResults, testSummary);
        const outPath = await this.entrypointPath(appPath);
        await this.fsManager.touch(outPath, tpl);
        return {
            outPath,
        };
    }
    async entrypointPath(appPath) {
        return this.fsManager.path(this.reportPath(appPath), 'index.html');
    }
    reportPath(appPath) {
        const testPath = this.fsManager.path(appPath, APP_TEST_DIR_NAME);
        const reportsPath = this.fsManager.path(testPath, APP_TEST_REPORTS_DIR_NAME);
        const reportPath = this.fsManager.path(reportsPath, 'simple-html');
        return reportPath;
    }
};
SimpleHTMLAppTestReportEmitter = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], SimpleHTMLAppTestReportEmitter);
export { SimpleHTMLAppTestReportEmitter };
// For now, we can have it here. When it becomes harder to maintain, we can introduce some kind of template engine.
// Be aware that this will introduce complexities on building the lib.
// We'll need to include these templates in the build and make them accessible via package.json "exports" or any other mechanism.
// Hence the choice to keep it simple for now.
// Defined it as function in case we need to pass args.
const template = (appPath, testResults, testSummary) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <style>
            html {
                color: #2b2a32;
                font-family: 'Courier New', Courier, monospace;
                font-size: 10pt;
            }
            body {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .summary {
                align-items: center;
                align-self: center;
                display: flex;
                gap: 10px;
            }
            .summary div {
                font-size: 2em;
                font-weight: bold;
                min-width: 100px;
                padding: 10px;
                text-align: center;
            }
            .summary div:first-of-type {
                border: 1px solid #2b2a32;
            }
            .summary a {
                color: inherit;
                text-decoration: none;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }
            table tr th {
                background: #474747;
                color: white;
            }
            table tr th, table tr td {
                border: 2px solid #2b2a32;
                max-width: 500px;
                padding: 3px;
                vertical-align: top;
            }
            table tr td:not(:has(pre)) {
                text-align: center;
            }
            table tr td pre {
                font-size: 8pt;
                white-space: break-spaces;
            }
            ${statusStyles()}
        </style>

        <title>${appPath} Test Report</title>
    </head>
    <body>
        <div class="summary">
            <div><a href="?">${testResults.length}</a></div>
            ${Object.entries(testSummary.counts)
    .map(([k, v]) => `<div class="${k}"><a href="?status=${k}">${v}</a></div>`)
    .join('')}
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Use Case</th>
                    <th>Auth</th>
                    <th>Input</th>
                    <th>Output</th>
                    <th>Err</th>
                    <th>Side effects</th>
                </tr>
            </thead>

            <tbody>${testResults.map((item, idx) => fmtTestResult(item, idx)).join('\n')}</tbody>

            <script type="text/javascript">
                const search = new URLSearchParams(window.location.search);
                const status = search.get('status');
                if (status) {
                    document.querySelectorAll(\`table tbody tr:not(.\${status\})\`).forEach((n) => n.remove());
                }
            </script>
        </table>
    </body>
</html>
`;
const STATUS_COLOR_MAPPING = {
    danger: '#ff4136', // red
    success: '#42e6a4', // green
    warning: '#ffff00', // yellow
};
function statusStyles() {
    return Object.entries(STATUS_COLOR_MAPPING)
        .map(([k, v]) => `.summary div.${k}, table tr.${k} td:first-of-type { background: ${v}; }`)
        .join('\n            ');
}
function fmtTestResult(item, idx) {
    const { name, out: { args: { auth, authName, inputFillerName }, err, io: { i, o }, }, sideEffects, status, } = item;
    return `
                <tr class="${status}">
                    <td>${idx + 1}</td>
                    <td>${name}</td>
                    <td>
                        ${authName}
                        ${fmtObj(auth)}
                    </td>
                    <td>
                        ${inputFillerName}
                        ${fmtObj(i)}
                    </td>
                    <td>${fmtObj(o)}</td>
                    <td>${fmtObj(fmtError(err))}</td>
                    <td>${fmtObj(fmtSideEffects(sideEffects))}</td>
                </tr>`;
}
function fmtObj(obj) {
    return `<pre>${JSON.stringify(obj, (_k, v) => (v === undefined ? '<undefined>' : v), 2)}</pre>`;
}
function fmtError(err) {
    return err
        ? {
            message: err.message,
            name: err.name,
        }
        : null;
}
function fmtSideEffects(sideEffects) {
    return sideEffects ? Array.from(sideEffects.entries()) : null;
}
