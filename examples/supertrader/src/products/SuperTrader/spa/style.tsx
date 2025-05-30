import type { StyleContextT } from 'libmodulor/react';

export const style: StyleContextT = {
    autoExecLoader: {
        className: 'loading loading-dots loading-xl',
    },
    execTouchable: {
        className: 'btn',
    },
    form: {
        className: 'flex gap-3 items-end',
    },
    formField: {},
    formFieldControl: {
        default: {
            className: 'input',
        },
        select: {
            className: 'select',
        },
        textarea: {
            className: 'textarea',
        },
    },
    formFieldDesc: {
        className: 'text-secondary',
    },
    formFieldErr: {
        className: 'text-error',
    },
    formFieldLabel: {
        className: 'font-medium text-xs',
    },
    formSubmitControl: {
        className: 'btn',
    },
};
