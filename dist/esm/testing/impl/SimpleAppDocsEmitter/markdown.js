export function pre(val) {
    if (!val) {
        return '-';
    }
    return `\`${val}\``;
}
export function thead(cols) {
    return `|#|${cols.join('|')}|
|---|${cols.map(() => '---').join('|')}|`;
}
