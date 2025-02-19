import type { Clearable, Initializable } from '../utils/index.js';
import type { Settings } from './SettingsManager.js';
import type { Worker } from './Worker.js';
export type JobManagerJobName = string;
export type JobManagerQueueName = string;
export interface JobManagerSettings extends Settings {
    job_manager_enabled: boolean;
    job_manager_processors: {
        queueName: JobManagerQueueName;
        workerClass: {
            new (...args: any[]): Worker<any, any>;
        };
    }[];
}
export interface JobManager extends Clearable, Initializable {
    /**
     * Send a new job on the queue for processing
     * @param queueName
     * @param jobName
     * @param input
     */
    dispatch<I>(queueName: JobManagerQueueName, jobName: JobManagerJobName, input: I): Promise<void>;
}
