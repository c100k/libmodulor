import type { ShellCommandExecutor, ShellCommandExecutorInput, ShellCommandExecutorOutput } from '../ShellCommandExecutor.js';
export declare class NodeSpawnShellCommandExecutor implements ShellCommandExecutor {
    exec({ bin, opts, }: ShellCommandExecutorInput): Promise<ShellCommandExecutorOutput>;
}
