import { type Container } from 'inversify';
import type { Logger, Worker } from '../../std/index.js';
interface Input {
    container: Container;
}
interface Output {
    bindingLines: string[];
}
export declare class ContainerPrinter implements Worker<Input, Promise<Output>> {
    private logger;
    constructor(logger: Logger);
    exec({ container }: Input): Promise<Output>;
    private symToString;
}
export {};
