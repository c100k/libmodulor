import type { HTTPAPICallExecutorAgentBuilder, HTTPAPICallExecutorAgentBuilderInput, HTTPAPICallExecutorAgentBuilderOutput } from '../HTTPAPICallExecutor.js';
export declare class NoopHTTPAPICallExecutorAgentBuilder implements HTTPAPICallExecutorAgentBuilder {
    exec(_input: HTTPAPICallExecutorAgentBuilderInput): HTTPAPICallExecutorAgentBuilderOutput;
}
