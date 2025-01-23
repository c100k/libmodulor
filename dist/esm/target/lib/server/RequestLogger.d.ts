import type { HTTPMethod, URL } from '../../../dt/index.js';
import type { EnvironmentManager, Logger, Worker } from '../../../std/index.js';
interface Input {
    body: unknown;
    method: HTTPMethod;
    url: URL;
}
export declare class RequestLogger implements Worker<Input, void> {
    private environmentManager;
    private logger;
    constructor(environmentManager: EnvironmentManager, logger: Logger);
    exec({ body, method, url }: Input): void;
}
export {};
