import { StyleSheet } from 'react-native';

import type { StyleContextT } from '../../../../dist/esm/index.react.js';
import UCFormFieldControl from './components/UCFormFieldControl.js';

const PRIMARY = '#3478f7';
const ON_PRIMARY = '#ffffff';
const GREY_500 = '#d1d1d1';

// Just to make it look like the same as the web target
const WEB_DEFAULT_BTN_STYLE = {
    backgroundColor: '#e9e9ed',
    borderColor: '#8f8f9c',
    borderRadius: 5,
    borderWidth: 1,
    padding: 2,
    textAlign: 'center',
};
const WEB_DEFAULT_INPUT_STYLE = {
    backgroundColor: '#ffffff',
    borderColor: WEB_DEFAULT_BTN_STYLE.borderColor,
    borderWidth: WEB_DEFAULT_BTN_STYLE.borderWidth,
    padding: 2,
};

const styles = StyleSheet.create({
    autoExecLoader: {},
    entrypointTouchable: {
        color: PRIMARY,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    execTouchable: {
        ...WEB_DEFAULT_BTN_STYLE,
    },
    form: {
        alignItems: 'flex-start',
        gap: 10,
    },
    formField: {
        gap: 4,
    },
    formFieldControl: {
        ...WEB_DEFAULT_INPUT_STYLE,
        width: 230,
    },
    formFieldControlRange: {
        width: 200,
    },
    formFieldControlRangeContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    formFieldDesc: {
        color: GREY_500,
    },
    formFieldErr: {
        color: 'red',
    },
    formFieldHelp: {
        color: GREY_500,
        fontSize: 10,
    },
    formFieldLabel: {
        fontWeight: 'bold',
        minWidth: 90,
    },
    formSubmitControl: {
        ...WEB_DEFAULT_BTN_STYLE,
    },
});

export const style: StyleContextT = {
    autoExecLoader: {
        style: styles.autoExecLoader,
    },
    colors: {
        onPrimary: ON_PRIMARY,
        primary: PRIMARY,
    },
    entrypointTouchable: {
        style: styles.entrypointTouchable,
    },
    execTouchable: {
        style: styles.execTouchable,
    },
    form: {
        style: styles.form,
    },
    formField: {
        style: styles.formField,
    },
    formFieldControl: {
        default: {
            style: styles.formFieldControl,
        },
        range: {
            style: styles.formFieldControlRange,
        },
        rangeContainer: {
            style: styles.formFieldControlRangeContainer,
        },
    },
    formFieldDesc: {
        style: styles.formFieldDesc,
    },
    formFieldErr: {
        style: styles.formFieldErr,
    },
    formFieldHelp: {
        style: styles.formFieldHelp,
    },
    formFieldLabel: {
        style: styles.formFieldLabel,
    },
    formSubmitControl: {
        style: styles.formSubmitControl,
    },
    renderFormFieldControl: UCFormFieldControl,
};
