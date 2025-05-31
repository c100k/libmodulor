import type { StyleContextT } from 'libmodulor/react';

export const style: StyleContextT = {
    autoExecLoader: {
        className:
            'w-12 h-12 border-4 border-dashed rounded-full border-blue-500 animate-spin',
    },
    execTouchable: {
        className:
            'px-6 py-1 bg-gray-900 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
    },
    form: {
        className: 'flex flex-col gap-5',
    },
    formField: {
        className: 'flex flex-col gap-1',
    },
    formFieldControl: {
        default: {
            className:
                'px-6 py-1 bg-gray-900 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
        },
    },
    formFieldDesc: {
        className: 'text-secondary',
    },
    formFieldErr: {
        className: 'text-error',
    },
    formFieldLabel: {
        className: 'block text-sm font-medium text-gray-700 mb-1',
    },
    formSubmitControl: {
        className:
            'px-6 py-1 bg-gray-900 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
    },
};
