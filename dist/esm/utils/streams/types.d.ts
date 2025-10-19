export type StreamOnClose = () => Promise<void>;
export type StreamOnData<D extends object> = (data: D) => Promise<void>;
export type StreamOnDone = () => Promise<void>;
export interface StreamConfig<D extends object> {
    /**
     * When the consumer closes the stream
     */
    onClose: StreamOnClose;
    /**
     * When the provider sends data
     */
    onData: StreamOnData<D>;
    /**
     * When the provider is done sending data
     */
    onDone: StreamOnDone;
}
