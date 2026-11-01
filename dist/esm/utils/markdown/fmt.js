// Minimum width of a column, imposed by the delimiter row (i.e. `---`)
const TABLE_COL_MIN_WIDTH = 3;
export function md_pre(val) {
    if (!val) {
        return '-';
    }
    return `\`${val}\``;
}
export function md_table(cols, rows, fmtIdx = (idx) => String(idx + 1)) {
    const header = ['#', ...cols];
    const body = rows.map((row, idx) => [fmtIdx(idx), ...row].map(String));
    const widths = header.map((h, colIdx) => Math.max(TABLE_COL_MIN_WIDTH, width(h), ...body.map((row) => width(row[colIdx] ?? ''))));
    const line = (cells) => `| ${widths.map((w, colIdx) => pad(cells[colIdx] ?? '', w)).join(' | ')} |`;
    return [
        line(header),
        line(widths.map((w) => '-'.repeat(w))),
        ...body.map(line),
    ].join('\n');
}
function pad(val, w) {
    return val + ' '.repeat(w - width(val));
}
// Display width, as computed by formatters (e.g. emojis take 2 columns)
function width(val) {
    let res = 0;
    for (const char of val) {
        if (/\p{Emoji_Presentation}/u.test(char)) {
            res += 2;
        }
        else if (!/[‍︎️]/.test(char)) {
            res += 1;
        }
    }
    return res;
}
