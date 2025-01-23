import type { ExternalResourceManager } from './ExternalResourceManager.js';
import type { Worker } from './Worker.js';
export interface ExternalResourceInstallerFeedback {
    message: string;
    mode: 'confirm' | 'done' | 'error' | 'prompt' | 'waiting';
}
export type ExternalResourceInstallerOnFeedback = (feedback: ExternalResourceInstallerFeedback) => Promise<void>;
interface Input {
    autoGenerate: boolean;
    force: boolean;
    manager: ExternalResourceManager;
    onFeedback: ExternalResourceInstallerOnFeedback;
}
export declare class ExternalResourceInstaller implements Worker<Input, Promise<void>> {
    exec({ autoGenerate, onFeedback, force, manager, }: Input): Promise<void>;
}
export {};
