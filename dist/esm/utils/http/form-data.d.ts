import type { FormDataBuilder } from '../../std/index.js';
import type { HTTPReqData } from './types.js';
export declare function fromFormData<T extends HTTPReqData>(fd: FormData): Promise<T>;
export declare function toFormData<T extends HTTPReqData>(data: T | undefined | null, fd: FormData, formDataBuilder: FormDataBuilder): Promise<void>;
