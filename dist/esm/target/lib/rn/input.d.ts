import type { TextInputProps } from 'react-native';
import { type DataType, type ErrorMessage } from '../../../dt/index.js';
import { type UCExecState, type UCInputField } from '../../../uc/index.js';
export interface RNInputDef {
    internal?: undefined;
    /**
     * Fields that are part of {@link TextInputProps}
     *
     * These are safe to destructure directly in a `<TextInput />` component.
     *
     * @example `<TextInput {...attrs.spec} />`
     */
    spec?: TextInputProps;
}
export declare function rnInputDef<T extends DataType>(field: UCInputField<T>, execState: UCExecState, _errMsg: ErrorMessage | null): RNInputDef;
