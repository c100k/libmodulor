import type { AppName } from '../app/index.js';
import type { UCName } from '../uc/index.js';
export interface ProductAppReg {
    name: AppName;
    ucds?: {
        exclude?: UCName[];
    } | undefined;
}
export type ProductName = string;
export interface ProductManifest {
    appReg: ProductAppReg[];
    name: ProductName;
}
export interface ProductWording {
    desc: string | null;
    slogan: string | null;
}
