import type { FormDataBuilder, FormDataBuilderVal } from '../FormDataBuilder.js';
export declare class SimpleFormDataBuilder implements FormDataBuilder {
    append(fd: FormData, key: string, val: FormDataBuilderVal): Promise<void>;
}
