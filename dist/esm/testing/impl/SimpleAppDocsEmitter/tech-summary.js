import { OUTPUT_ITEM_FIELDS, } from '../../UCDefASTParser.js';
import { thead } from './markdown.js';
export function techSummary(items) {
    return `${thead(OUTPUT_ITEM_FIELDS)}
${items
        .map((item, idx) => ['', idx + 1, ...OUTPUT_ITEM_FIELDS.map((f) => val(item[f])), ''].join('|'))
        .join('\n')}`;
}
function val(value) {
    if (!value) {
        return '';
    }
    const values = Array.isArray(value) ? value : [value];
    // NOTE : <br> won't work for every markdown renderer.
    // See https://stackoverflow.com/questions/11700487/how-do-i-add-a-newline-in-a-markdown-table
    return values.map(fmtVal).join('<br>');
}
function fmtVal(field) {
    const { err, value } = field;
    let res = (typeof value === 'string' ? value : value.raw) ?? '';
    if (err) {
        res += `❌ ${err}`;
    }
    res = res.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`); // TS generics considered as HTML
    res = res.replaceAll('|', '\\|'); // TS intersection vs Markdown table column
    return res;
}
