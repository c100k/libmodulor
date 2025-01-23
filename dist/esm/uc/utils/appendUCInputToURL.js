import { rInput } from './rInput.js';
export function appendUCInputToURL(uc, url) {
    const data = rInput(uc, { ignoreUndefined: true });
    for (const [key, value] of Object.entries(data)) {
        const isArray = Array.isArray(value);
        const keyToSend = isArray ? `${key}[]` : key;
        const valueToSend = isArray ? value : [value];
        for (const v of valueToSend) {
            url.searchParams.append(keyToSend, v);
        }
    }
}
