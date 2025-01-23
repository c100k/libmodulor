import { TNumIndex, TSearchQuery, TUIntQuantity, TUUID, } from '../../../dt/index.js';
export const ListInputDef = {
    fields: {
        id: {
            cardinality: {
                min: 0,
            },
            type: new TUUID(),
        },
        limit: {
            cardinality: {
                min: 0,
            },
            type: new TUIntQuantity(),
        },
        offset: {
            cardinality: {
                min: 0,
            },
            type: new TNumIndex(),
        },
        q: {
            cardinality: {
                min: 0,
            },
            type: new TSearchQuery(),
        },
    },
};
