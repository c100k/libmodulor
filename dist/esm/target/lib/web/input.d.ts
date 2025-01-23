import { type DataType, type ErrorMessage, type HTMLInputType } from '../../../dt/index.js';
import { type UCExecState, type UCInputField } from '../../../uc/index.js';
export interface HTMLInputDef {
    internal?: {
        multiline?: boolean | undefined;
    };
    spec?: {
        'aria-errormessage'?: string | undefined;
        'aria-invalid'?: boolean | undefined;
        disabled?: boolean | undefined;
        id?: string | undefined;
        max?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        minLength?: number | undefined;
        name?: string | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | false;
        step?: number | undefined;
        type?: HTMLInputType | undefined;
    };
}
export declare function htmlInputDef<T extends DataType>(field: UCInputField<T>, execState: UCExecState, errMsg: ErrorMessage | null): HTMLInputDef;
