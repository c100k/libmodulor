import type { AnySideEffect } from '../../utils/index.js';
import type { JobManager, JobManagerJobName, JobManagerQueueName } from '../JobManager.js';
export declare class FakeJobManager implements JobManager {
    entries: {
        input: unknown;
        jobName: JobManagerJobName;
        queueName: JobManagerQueueName;
    }[];
    constructor();
    clear(): Promise<void>;
    dispatch<I>(queueName: JobManagerQueueName, jobName: JobManagerJobName, input: I): Promise<void>;
    sideEffects(): Promise<AnySideEffect[]>;
    init(): Promise<void>;
    initSync(): void;
}
