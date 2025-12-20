import { isBlank } from '../../../utils/index.js';
export const UC_FORM_FIELD_ELEMENTS = [
    'control',
    'desc',
    'err',
    'help',
    'label',
];
export function validateFormField(i18nManager, f) {
    if (isBlank(f.getValue())) {
        return null;
    }
    const validation = f.validate();
    const violation = validation.get();
    if (violation) {
        const [key, expected] = violation;
        return i18nManager.t(key, { vars: { expected } });
    }
    return null;
}
