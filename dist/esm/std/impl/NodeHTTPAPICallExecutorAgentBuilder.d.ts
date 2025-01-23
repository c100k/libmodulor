import type { EnvironmentManager } from '../EnvironmentManager.js';
import type { HTTPAPICallExecutorAgentBuilder, HTTPAPICallExecutorAgentBuilderInput, HTTPAPICallExecutorAgentBuilderOutput } from '../HTTPAPICallExecutor.js';
export declare class NodeHTTPAPICallExecutorAgentBuilder implements HTTPAPICallExecutorAgentBuilder {
    private environmentManager;
    constructor(environmentManager: EnvironmentManager);
    exec({ url, }: HTTPAPICallExecutorAgentBuilderInput): HTTPAPICallExecutorAgentBuilderOutput;
}
