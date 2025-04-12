import { appendData } from './appendData.js';
export async function fromQueryParams(url) {
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    const data = {};
    for (const [k, v] of url.searchParams) {
        const isMultiple = k.endsWith('[]');
        const key = isMultiple ? k.replaceAll('[]', '') : k;
        const value = data[key];
        if (value === undefined) {
            data[key] = isMultiple ? [v] : v;
        }
        else if (Array.isArray(value)) {
            value.push(v);
        }
    }
    return data;
}
export async function toQueryParams(data, url) {
    await appendData(data, async (k, v) => url.searchParams.append(k, v));
}
