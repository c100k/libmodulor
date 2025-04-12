export async function stop(server) {
    if (!server?.listening) {
        return;
    }
    // As stated in the docs of `close`, only awaiting `.close` is not enough to make sure all the connections are closed.
    // Hence the wrapping in a promise, where the callback is called when the 'close' event is emitted.
    return new Promise((resolve, reject) => {
        if (!server) {
            return resolve();
        }
        server.close((err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
