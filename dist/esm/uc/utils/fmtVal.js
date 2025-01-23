function fmtVal(wordingManager, label, type, value, ifNullOrUndefined) {
    type.assign(value);
    let desc = null;
    let val = type.fmt(ifNullOrUndefined);
    if (type.hasOptions()) {
        const { desc: tDesc, label: tLabel } = wordingManager.dt(type);
        desc = tDesc;
        val = tLabel;
    }
    type.clear();
    return [label, desc, val];
}
export function fmtInputVal(wordingManager, field, ifNullOrUndefined) {
    const { label } = wordingManager.ucif(field);
    return fmtVal(wordingManager, label, field.def.type, field.getValue(), ifNullOrUndefined);
}
export function fmtOPIVal(wordingManager, field, item, ifNullOrUndefined) {
    const { label } = wordingManager.ucof(field.key);
    return fmtVal(wordingManager, label, field.def.type, item?.[field.key], ifNullOrUndefined);
}
