import { Metadata, Server, } from '@grpc/grpc-js';
import { defaultStreamOnClose, } from '../../../utils/index.js';
export function buildHandler(appManifest, ucd, fileMetadataManager, serverRequestHandler, ucManager) {
    const transportType = ucd.ext?.http?.transportType ?? 'standard';
    switch (transportType) {
        case 'standard': {
            return buildStandardHandler(appManifest, ucd, fileMetadataManager, serverRequestHandler, ucManager);
        }
        case 'stream': {
            return buildStreamHandler(appManifest, ucd, fileMetadataManager, serverRequestHandler, ucManager);
        }
        default:
            transportType;
            throw new Error();
    }
}
export function buildStandardHandler(appManifest, ucd, fileMetadataManager, serverRequestHandler, ucManager) {
    return async (call, callback) => {
        const metadata = new Metadata();
        const { body, rawErr, status } = await serverRequestHandler.exec({
            appManifest,
            req: toReq(fileMetadataManager, call),
            res: toRes(metadata),
            ucd,
            ucManager,
        });
        if (rawErr) {
            rawErr.code = status;
            return callback(rawErr);
        }
        callback(null, body ? body : {}, metadata);
    };
}
export function buildStreamHandler(appManifest, ucd, fileMetadataManager, serverRequestHandler, ucManager) {
    return async (call) => {
        let streamedOnce = false;
        const execOpts = {
            stream: {
                onClose: defaultStreamOnClose(streamedOnce),
                onData: async (output) => {
                    streamedOnce = true;
                    if (!output) {
                        return;
                    }
                    call.write(output);
                },
                onDone: async () => {
                    call.end();
                },
            },
        };
        call.on('close', async () => {
            await execOpts?.stream?.onClose();
        });
        const metadata = new Metadata();
        await serverRequestHandler.exec({
            appManifest,
            execOpts,
            req: toReq(fileMetadataManager, call),
            res: toRes(metadata),
            ucd,
            ucManager,
        });
    };
}
export function init() {
    const server = new Server();
    return server;
}
export function listen(server, creds, entrypointsBuilder, logger) {
    const { grpc } = entrypointsBuilder.exec();
    server.bindAsync(grpc, creds, (err, _port) => {
        if (err) {
            logger.error(err);
            return;
        }
        logger.info(`Listening on ${grpc}`);
    });
}
export async function stop(server, settingsManager) {
    const mode = settingsManager.get()('server_stop_mode');
    return new Promise((resolve, reject) => {
        switch (mode) {
            case 'aggressive':
                server.forceShutdown();
                resolve();
                break;
            case 'patient':
                server.tryShutdown((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
                break;
            default:
                mode;
        }
    });
}
export function toReq(fileMetadataManager, call) {
    return {
        bodyFromRequest: async () => readBodyFromRequest(fileMetadataManager, call.request),
        bodyRaw: call.request,
        metadata: async (name) => call.metadata.get(name).toString(),
        // TODO : Figure out a way to set this from something else (call does not hold it)
        secure: false,
        url: `${call.getHost()}${call.getPath()}`,
    };
}
export function toRes(metadata) {
    return {
        setMetadata: async (name, value) => metadata.set(name, value),
    };
}
async function readBodyFromRequest(fileMetadataManager, request) {
    const input = {};
    for (const [k, v] of Object.entries(request)) {
        if (v instanceof Buffer) {
            const tmpFile = new File([v], '');
            const { mimeType } = await fileMetadataManager.info(tmpFile);
            input[k] = new File([v], '', {
                type: mimeType,
            });
        }
        else {
            input[k] = v;
        }
    }
    return input;
}
