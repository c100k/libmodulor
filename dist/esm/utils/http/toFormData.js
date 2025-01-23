import { appendData } from './appendData.js';
export async function toFormData(data, fd, formDataBuilder) {
    await appendData(data, (k, v) => formDataBuilder.append(fd, k, v));
}
