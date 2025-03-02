var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { spawn } from 'node:child_process';
import { injectable } from 'inversify';
let NodeSpawnShellCommandExecutor = class NodeSpawnShellCommandExecutor {
    async exec({ bin, opts, }) {
        return new Promise((resolve, reject) => {
            let stderr = '';
            let stdout = '';
            const proc = spawn(bin, opts?.args || [], {
                cwd: opts?.cwd,
                env: opts?.env,
            });
            proc.stderr.on('data', (chunk) => {
                stderr += chunk;
            });
            proc.stdout.on('data', (chunk) => {
                stdout += chunk;
            });
            proc.on('error', (err) => {
                reject(err);
            });
            proc.on('close', (code, signal) => {
                if (code === 0) {
                    resolve(stdout);
                }
                else {
                    reject(new Error(`Command failed with exit code (${code}), signal (${signal}), stderr (${stderr}) stdout (${stdout})`));
                }
            });
        });
    }
};
NodeSpawnShellCommandExecutor = __decorate([
    injectable()
], NodeSpawnShellCommandExecutor);
export { NodeSpawnShellCommandExecutor };
