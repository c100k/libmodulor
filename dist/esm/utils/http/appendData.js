export async function appendData(data, func) {
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
