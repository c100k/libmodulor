import { UCInputFieldChangeOperator } from '../input-field.js';
export function ucifcoIsForArray(op) {
    return [
        UCInputFieldChangeOperator.ADD,
        UCInputFieldChangeOperator.REMOVE,
    ].includes(op);
}
