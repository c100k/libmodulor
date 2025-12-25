import type { ShellCommandExecutor, ShellCommandExecutorInput, ShellCommandExecutorOutput } from '../ShellCommandExecutor.js';
interface FakeShellCommandExecutorEntry {
    exec: (bin: ShellCommandExecutorInput['bin'], opts: ShellCommandExecutorInput['opts']) => Promise<ShellCommandExecutorOutput>;
    on: (bin: ShellCommandExecutorInput['bin'], opts: ShellCommandExecutorInput['opts']) => boolean;
}
export declare class FakeShellCommandExecutor implements ShellCommandExecutor {
    entries: FakeShellCommandExecutorEntry[];
    history: ShellCommandExecutorInput[];
    constructor(entries?: FakeShellCommandExecutorEntry[]);
    exec({ bin, opts, }: ShellCommandExecutorInput): Promise<ShellCommandExecutorOutput>;
}
export {};
