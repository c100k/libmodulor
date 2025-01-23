import { CustomError } from '../../../error/index.js';
import type { EnvironmentManager, Logger, Worker } from '../../../std/index.js';
interface Input {
    error: Error;
}
interface Output {
    error: CustomError;
}
export declare class CustomerFacingErrorBuilder implements Worker<Input, Output> {
    private environmentManager;
    private logger;
    constructor(environmentManager: EnvironmentManager, logger: Logger);
    exec({ error }: Input): Output;
}
export {};
