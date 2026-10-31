import { TUUID } from '../../../dt/index.js';
import { UCInputFieldFillingMode, } from '../../input-field.js';
export const AggregateInputDef = {
    fields: {
        id: {
            fillingMode: UCInputFieldFillingMode.AUTO_PRE,
            transient: true,
            type: new TUUID(),
        },
    },
};
