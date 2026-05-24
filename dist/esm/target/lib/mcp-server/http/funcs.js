import { defaultStreamOnClose } from '../../../../utils/index.js';
export function ucStreamExecOpts(logger, transportType, extra) {
    let execOpts;
    switch (transportType) {
        case 'standard':
            // Nothing to do
            break;
        case 'stream': {
            let streamedOnce = false;
            execOpts = {
                stream: {
                    onClose: defaultStreamOnClose(streamedOnce),
                    onData: async (output) => {
                        logger.trace('execOpts.stream.onData', {
                            output: JSON.stringify(output),
                        });
                        streamedOnce = true;
                        if (!output) {
                            return;
                        }
                        try {
                            await extra.sendNotification({
                                method: 'notifications/message',
                                params: {
                                    data: output,
                                    level: 'info',
                                },
                            });
                        }
                        catch (_err) {
                            // There are cases where the client (e.g. Claude) has already closed the stream
                            // without triggering any lifecycle method (e.g `transport.onclose` or `c.req.raw.signal.addEventListener('abort')` with hono.
                            // Sending a notification in this case triggers an error like so : `No connection established for request ID: 1`.
                            // So we assume it's closed and force close the stream.
                            logger.trace('Connection already closed => force closing stream');
                            await execOpts?.stream?.onClose();
                        }
                    },
                    onDone: async () => {
                        logger.trace('execOpts.stream.onDone');
                    },
                },
            };
            break;
        }
        default:
            transportType;
    }
    return execOpts;
}
