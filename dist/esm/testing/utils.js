const ERR_SRC_IMPORTER_TIMEOUT = (path) => `Importing ${path} did not resolve within 5000ms. Check for any circular dependencies.`;
export function awaitForSrcImport(path, timeoutInMs = 5000) {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject(new Error(ERR_SRC_IMPORTER_TIMEOUT(path)));
        }, timeoutInMs);
    });
}
