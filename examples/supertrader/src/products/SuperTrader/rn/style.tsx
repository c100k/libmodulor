import type { StyleContextT } from 'libmodulor/react';
import { StyleSheet } from 'react-native';

const PRIMARY = '#3478f7';
const ON_PRIMARY = '#ffffff';
const GREY_100 = '#f7f7f7';
const GREY_500 = '#d1d1d1';

const styles = StyleSheet.create({
    autoExecLoader: {},
    entrypointTouchable: {
        backgroundColor: PRIMARY,
        color: ON_PRIMARY,
        padding: 2,
        textAlign: 'center',
    },
    execTouchable: {
        backgroundColor: PRIMARY,
        color: ON_PRIMARY,
        padding: 2,
        textAlign: 'center',
    },
    form: {
        alignItems: 'flex-start',
        gap: 10,
    },
    formField: {
        gap: 5,
    },
    formFieldControl: {
        borderColor: GREY_100,
        borderWidth: 1,
        padding: 2,
        width: 230,
    },
    formFieldDesc: {
        color: GREY_500,
    },
    formFieldErr: {
        color: 'red',
    },
    formFieldLabel: {
        fontWeight: 'bold',
        minWidth: 90,
    },
    formSubmitControl: {
        backgroundColor: PRIMARY,
        color: ON_PRIMARY,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'center',
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
    },
    formFieldDesc: {
        style: styles.formFieldDesc,
    },
    formFieldErr: {
        style: styles.formFieldErr,
    },
    formFieldLabel: {
        style: styles.formFieldLabel,
    },
    formSubmitControl: {
        style: styles.formSubmitControl,
    },
};
