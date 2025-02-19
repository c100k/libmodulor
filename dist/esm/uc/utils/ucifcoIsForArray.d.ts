import { UCInputFieldChangeOperator } from '../input-field.js';
/**
 * Check whether a {@link UCInputFieldChangeOperator} is for an array or not.
 *
 * @param op
 * @returns
 */
export declare function ucifcoIsForArray(op: UCInputFieldChangeOperator): op is UCInputFieldChangeOperator.ADD | UCInputFieldChangeOperator.REMOVE;
