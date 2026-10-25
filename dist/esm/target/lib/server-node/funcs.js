export async function listen(server, entrypointsBuilder, logger, settingsManager) {
    const host = settingsManager.get()('server_binding_host');
    const port = settingsManager.get()('server_binding_port');
    // Resolve only once the server is actually bound, otherwise callers (e.g. tests) can hit it before it accepts connections.
    return new Promise((resolve, reject) => {
        const onError = (err) => reject(err);
        server.once('error', onError);
        server.listen(port, host, () => {
            server.off('error', onError);
            logger.info(`Listening on ${entrypointsBuilder.exec().http}`);
            resolve();
        });
    });
}
export async function stop(server, settingsManager) {
    if (!server?.listening) {
        return;
    }
    const mode = settingsManager.get()('server_stop_mode');
    // As stated in the docs of `close`, only awaiting `.close` is not enough to make sure all the connections are closed.
    // Hence the wrapping in a promise, where the callback is called when the 'close' event is emitted.
    return new Promise((resolve, reject) => {
        if (!server) {
            return resolve();
        }
        switch (mode) {
            case 'aggressive':
                server.closeAllConnections();
                break;
            case 'patient':
                break;
            default:
                mode;
        }
        server.close((err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
