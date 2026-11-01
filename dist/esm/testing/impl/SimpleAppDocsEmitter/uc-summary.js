import { humanize, md_pre, md_table } from '../../../utils/index.js';
import { ucSequenceDiagram } from './sequence-diagram.js';
export function ucSummary(item) {
    return `### ${item.metadataName?.value}

${lifecycle(item)}

${fields(item)}

#### Sequence Diagram

${ucSequenceDiagram(item)}`;
}
const UC_FIELDS_TABLES_COLS = ['name', 'humanized', 'dataType'];
function fields(item) {
    const { ioIFields, ioOPI0Fields, ioOPI1Fields } = item;
    return `#### Input (I)

${ucFieldsTable(ioIFields)}

#### Output (O)

##### Part 0 (OPI0)

${ucFieldsTable(ioOPI0Fields)}

##### Part 1 (OPI1)

${ucFieldsTable(ioOPI1Fields)}`;
}
function ucFieldsTable(fields) {
    if (!fields || fields.length === 0) {
        return 'None';
    }
    return md_table(UC_FIELDS_TABLES_COLS, fields.map(({ value: { dataType, name } }) => [
        md_pre(name),
        name ? humanize(name) : '',
        md_pre(dataType),
    ]));
}
function lifecycle(item) {
    const { lifecycleClientPolicy, lifecycleServerPolicy } = item;
    return `- **Type** : ${md_pre(lifecycleType(item))}
- **Client Policy** : ${md_pre(lifecycleClientPolicy?.value)}
- **Server Policy** : ${md_pre(lifecycleServerPolicy?.value)}`;
}
function lifecycleType(item) {
    const { lifecycleClientPolicy, lifecycleServerPolicy } = item;
    if (lifecycleClientPolicy && lifecycleServerPolicy) {
        return 'Client / Server';
    }
    if (lifecycleClientPolicy) {
        return 'Client only';
    }
    return 'Server only';
}
