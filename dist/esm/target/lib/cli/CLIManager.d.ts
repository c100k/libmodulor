import type { TargetEntrypointInput } from '../entrypoint.js';
export type Input = TargetEntrypointInput;
export type Output = void;
export interface CLIManager {
    handleCommand(input: Input): Promise<void>;
}
