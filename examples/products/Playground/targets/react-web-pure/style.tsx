import type { StyleContextT } from '../../../../../dist/esm/index.react.js';
import UCFormFieldControl from './components/UCFormFieldControl.js';

const PRIMARY = '#3478f7';
const ON_PRIMARY = '#ffffff';
const GREY_500 = '#d1d1d1';

export const style: StyleContextT = {
    autoExecLoader: {},
    colors: {
        onPrimary: ON_PRIMARY,
        primary: PRIMARY,
    },
    entrypointTouchable: {
        style: {
            color: PRIMARY,
        },
    },
    execTouchable: {
        style: {},
    },
    form: {
        style: {
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
        },
    },
    formField: {
        style: {
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
        },
    },
    formFieldControl: {
        default: {
            style: {
                padding: 2,
                width: 230,
            },
        },
        range: {
            style: {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
            },
        },
    },
    formFieldDesc: {
        style: {
            color: GREY_500,
        },
    },
    formFieldErr: {
        style: {
            color: 'red',
        },
    },
    formFieldHelp: {
        style: {
            color: GREY_500,
            fontSize: '0.8em',
        },
    },
    formFieldLabel: {
        style: {
            fontWeight: 'bold',
            minWidth: 90,
        },
    },
    formSubmitControl: {
        style: {},
    },
    renderFormFieldControl: UCFormFieldControl,
};
