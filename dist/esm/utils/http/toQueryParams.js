import { appendData } from './appendData.js';
export async function toQueryParams(data, url) {
    await appendData(data, async (k, v) => url.searchParams.append(k, v));
}
