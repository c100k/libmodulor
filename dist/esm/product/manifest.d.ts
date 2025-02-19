import type { AppName } from '../app/index.js';
import type { UCName } from '../uc/index.js';
export interface ProductAppReg {
    /**
     * It must correspond to the app folder name in the {@link APPS_ROOT_PATH}.
     */
    name: AppName;
    /**
     * By default, a product mounts all the enabled use cases of an app.
     *
     * With this, you can override this default behavior.
     */
    ucds?: {
        /**
         * Use Cases to exclude from the product
         *
         * For example, you can have a generic `Auth` app, used in multiple products.
         * Some of them will require `SignUp` while others won't. With this setting,
         * you can exclude the use cases that you don't want. In this case, they won't be mounted.
         */
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
