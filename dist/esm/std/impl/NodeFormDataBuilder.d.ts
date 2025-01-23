import type { FormDataBuilder, FormDataBuilderVal } from '../FormDataBuilder.js';
export declare class NodeFormDataBuilder implements FormDataBuilder {
    append(fd: FormData, key: string, val: FormDataBuilderVal): Promise<void>;
}
