import { appendData } from './appendData.js';
export async function fromFormData(fd) {
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    const data = {};
    for (const [k, v] of fd) {
        const isMultiple = k.endsWith('[]'); // e.g. 'tags[]': 'Electronic'
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
export async function toFormData(data, fd, formDataBuilder) {
    await appendData(data, (k, v) => formDataBuilder.append(fd, k, v));
}
