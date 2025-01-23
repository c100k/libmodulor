import type { HTTPReqData } from './types.js';
export declare function appendData<T extends HTTPReqData>(data: T | undefined | null, func: (key: string, val: any) => Promise<void>): Promise<void>;
