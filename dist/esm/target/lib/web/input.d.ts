import { type DataType, type ErrorMessage, type HTMLInputType } from '../../../dt/index.js';
import { type UCExecState, type UCInputField } from '../../../uc/index.js';
export interface HTMLInputDef {
    /**
     * Internal types that are not part of the W3C spec
     *
     * @see node_modules/@types/react/index.d.ts#InputHTMLAttributes
     */
    internal?: {
        /**
         * When checked is set, you should probably set `checked` or `defaultChecked` in uncontrolled components (react).
         */
        checked?: boolean | undefined;
        /**
         * When a field is `multiline`, you should probably render a `<textarea />` instead of an `<input />`.
         */
        multiline?: boolean | undefined;
        /**
         * When value is set, you should probably set `value` or `defaultValue` in uncontrolled components (react).
         */
        value?: string | undefined;
    };
    /**
     * Fields that are part of the W3C spec
     *
     * These are safe to destructure directly in an `<input />` component.
     *
     * Note that they come with their camel case form, à la React.
     * The reason is that it's easier to transform this to the original spec (`maxLength` => `maxlength`) vs doing the opposite (`maxlength` > `maxLength`).
     * In the first case, we can simply call `.toLowerCase()` on the keys, while in the second, we'd need a dedicated function that "camel-cases" a string.
     *
     * @example `<input {...attrs.spec} />`
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
     * @see node_modules/@types/react/index.d.ts `InputHTMLAttributes`
     */
    spec?: {
        'aria-errormessage'?: string | undefined;
        'aria-invalid'?: boolean | undefined;
        className?: string | undefined;
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
export declare function htmlInputDef<T extends DataType>(field: UCInputField<T>, execState: UCExecState, errMsg: ErrorMessage | null, className: string | undefined): HTMLInputDef;
