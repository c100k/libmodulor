const ERR_MISSING_STREAM_ON_CLOSE = 'execOpts.stream.onClose needs to be set in the ServerMain to avoid memory leaks';
export function defaultStreamOnClose(streamedOnce) {
    return async () => {
        if (!streamedOnce) {
            // No need to close or register anything if it hasn't streamed anything yet
            return;
        }
        throw new Error(ERR_MISSING_STREAM_ON_CLOSE);
    };
}
