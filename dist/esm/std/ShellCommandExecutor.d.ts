import type { FilePath } from '../dt/index.js';
import type { Worker } from './Worker.js';
export type ShellCommandExecutorCommandArg = string;
export type ShellCommandExecutorCommandBin = 'bun' | 'docker' | 'file' | 'git' | 'npm' | 'open' | 'pnpm' | 'ssh-keygen' | 'ssh-keyscan' | 'unzip' | 'yarn' | 'zip' | (string & {});
export type ShellCommandExecutorEnv = Record<string, string>;
export type ShellCommandExecutorInstruction = string;
export type ShellCommandExecutorScript = string;
export type ShellCommandExecutorShebang = '#!/bin/bash';
export interface ShellCommandExecutorInput {
    bin: ShellCommandExecutorCommandBin;
    opts?: {
        args?: ShellCommandExecutorCommandArg[];
        cwd?: FilePath;
        env?: ShellCommandExecutorEnv;
        streamData?: boolean;
    };
}
export type ShellCommandExecutorOutput = string;
export interface ShellCommandExecutor extends Worker<ShellCommandExecutorInput, Promise<ShellCommandExecutorOutput>> {
}
