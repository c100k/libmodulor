import { TUUID } from '../../../dt/index.js';
export const AggregateOutputDef = {
    parts: {
        _0: {
            fields: {
                id: {
                    key: 'id',
                    type: new TUUID(),
                },
            },
        },
    },
};
