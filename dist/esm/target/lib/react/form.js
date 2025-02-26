export const UC_FORM_FIELD_ELEMENTS = [
    'control',
    'desc',
    'err',
    'label',
];
export function validateFormField(i18nManager, f, v) {
    const vArr = Array.isArray(v) ? v : [v];
    for (const vv of vArr) {
        const validation = f.def.type.assign(vv).validate();
        const violation = validation.get();
        if (violation) {
            const [key, expected] = violation;
            return i18nManager.t(key, { vars: { expected } });
        }
    }
    return null;
}
