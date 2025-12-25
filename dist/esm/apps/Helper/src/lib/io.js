import { APPS_ROOT_PATH, PRODUCTS_ROOT_PATH } from '../../../../convention.js';
import { TDirPath } from '../../../../dt/index.js';
export const AppInputFieldsDef = {
    appsPath: {
        cardinality: {
            min: 0,
        },
        type: new TDirPath()
            .setDefaultValue(APPS_ROOT_PATH.join('/'))
            .setExamples([APPS_ROOT_PATH.join('/')]),
    },
};
export const ProductInputFieldsDef = {
    productsPath: {
        cardinality: {
            min: 0,
        },
        type: new TDirPath()
            .setDefaultValue(PRODUCTS_ROOT_PATH.join('/'))
            .setExamples([PRODUCTS_ROOT_PATH.join('/')]),
    },
};
