import { valuesIn } from '../../../utils/index.js';
const ERR_PATH_MISSING = 'The UC contract is missing in the options';
export function serviceDefinition(root, service) {
    return Object.fromEntries(valuesIn(service.methods).map((method) => {
        const { options, requestStream, requestType, responseStream, responseType, } = method;
        const req = root.lookupType(requestType);
        const res = root.lookupType(responseType);
        if (!options ||
            !('contract' in options) ||
            // biome-ignore lint/complexity/useLiteralKeys: typescript disagrees
            !('grpc' in options['contract'])) {
            throw new Error(ERR_PATH_MISSING);
        }
        // biome-ignore lint/complexity/useLiteralKeys: typescript disagrees
        const { path } = options['contract'].grpc;
        // TODO: Support pathAliases
        return [
            method.name,
            {
                path,
                requestDeserialize: (b) => req.toObject(req.decode(b), {
                    defaults: false,
                }),
                requestSerialize: (v) => Buffer.from(req.encode(v).finish()),
                requestStream: requestStream ?? false,
                responseDeserialize: (b) => res.decode(b),
                responseSerialize: (v) => Buffer.from(res.encode(v).finish()),
                responseStream: responseStream ?? false,
            },
        ];
    }));
}
