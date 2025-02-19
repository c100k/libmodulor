var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { injectable } from 'inversify';
let NodePromptManager = class NodePromptManager {
    async prompt(invite, opts) {
        // TODO : Add keypress handling to hide when sensitive data is typed
        const readLine = createInterface({
            input: stdin,
            output: stdout,
        });
        // To avoid "Warning: Detected unsettled top-level await at file:///[...]/dist/esm/xxx.js"
        // when pressing Ctrl+C while being prompted
        readLine.on('SIGINT', () => {
            readLine.close();
            process.exit(0);
        });
        const message = `${invite} : `;
        let res = '';
        let isValid = false;
        while (!isValid) {
            res = await readLine.question(message);
            isValid = opts?.validate ? await opts.validate(res) : true;
        }
        readLine.close();
        return res;
    }
};
NodePromptManager = __decorate([
    injectable()
], NodePromptManager);
export { NodePromptManager };
