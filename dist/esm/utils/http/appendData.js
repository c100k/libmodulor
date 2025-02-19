export async function appendData(data, 
// biome-ignore lint/suspicious/noExplicitAny: can be anything
func) {
    // Checking undefined and null because Object.keys(undefined|null) throws
    // TypeError: Cannot convert undefined or null to object
    if (data === undefined || data === null) {
        return;
    }
    for await (const key of Object.keys(data)) {
        const value = data[key];
        const isArray = Array.isArray(value);
        const keyToSend = isArray ? `${key}[]` : key;
        const valueToSend = isArray ? value : [value];
        for await (const v of valueToSend) {
            await func(keyToSend, v);
        }
    }
}
