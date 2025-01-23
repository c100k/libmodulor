import { type Container } from 'inversify';
import type { Logger, Worker } from '../../std/index.js';
interface Input {
    container: Container;
}
export declare class ContainerPrinter implements Worker<Input, Promise<void>> {
    private logger;
    constructor(logger: Logger);
    exec({ container }: Input): Promise<void>;
    private symToString;
}
export {};
