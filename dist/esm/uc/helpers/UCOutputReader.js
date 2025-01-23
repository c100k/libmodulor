import { TUUID } from '../../dt/index.js';
import { UCOutputField } from '../UCOutputField.js';
const ERR_NO_FIELD = (key) => `No field ${key} is defined for this use case`;
const ERR_NO_IO_OUTPUT = 'No output is defined for this use case';
const ERR_NO_IO_OUTPUT_PART = (idx) => `No output part ${idx} is defined for this use case`;
const ERR_NO_ITEMS = 'No items are available';
const ERR_NO_ITEM = 'No item is available';
const ERR_TOO_MANY_ITEMS = 'Too many items are available. Do not use item00';
export class UCOutputReader {
    _ucd;
    _output;
    _part0;
    _part1;
    constructor(_ucd, _output) {
        this._ucd = _ucd;
        this._output = _output;
    }
    field0(key) {
        const part = this.part0();
        const field = part.fields.find((f) => f.key === key);
        if (!field) {
            throw new Error(ERR_NO_FIELD(key));
        }
        return field;
    }
    item00() {
        const { io } = this._ucd;
        if (!io.o) {
            throw new Error(ERR_NO_IO_OUTPUT);
        }
        const { items, layout } = this.part0();
        if (items.length === 0) {
            throw new Error(ERR_NO_ITEMS);
        }
        if (items.length > 1) {
            throw new Error(ERR_TOO_MANY_ITEMS);
        }
        const [item] = items;
        if (!item) {
            throw new Error(ERR_NO_ITEM);
        }
        return {
            item,
            layout,
        };
    }
    canItem00() {
        const { io } = this._ucd;
        return (!!io.o?.parts?._0 &&
            io.o?.parts?._1 === undefined &&
            this._output !== undefined &&
            this._output.parts._0.total === 1);
    }
    isEmpty() {
        return this._output === undefined;
    }
    part(idx) {
        const { io } = this._ucd;
        if (!io.o?.parts) {
            throw new Error(ERR_NO_IO_OUTPUT);
        }
        const key = `_${idx}`;
        const partDef = io.o.parts[key];
        if (!partDef) {
            return undefined;
        }
        const { fields, layout, order, related } = partDef;
        const allFields = { id: { type: new TUUID() }, ...fields };
        const allFieldsKeys = order ?? Object.keys(allFields);
        let items = [];
        let total = 0;
        const part = this._output?.parts[key];
        if (part) {
            items = part.items;
            total = part.total;
        }
        return {
            fields: allFieldsKeys.map((fieldKey) => new UCOutputField(fieldKey, allFields[fieldKey])),
            idx,
            items,
            key,
            layout,
            pagination: {
                label: `${items.length}/${total}`,
                total: total,
            },
            related,
        };
    }
    part0() {
        if (!this._part0) {
            this._part0 = this.part(0);
        }
        if (!this._part0) {
            throw new Error(ERR_NO_IO_OUTPUT_PART(0));
        }
        return this._part0;
    }
    part1() {
        if (!this._part1) {
            this._part1 = this.part(1);
        }
        return this._part1;
    }
    parts() {
        const p0 = this.part0();
        const p1 = this.part1();
        if (!p1) {
            return [p0];
        }
        return [p0, p1];
    }
    output() {
        return this._output;
    }
    ucd() {
        return this._ucd;
    }
}
