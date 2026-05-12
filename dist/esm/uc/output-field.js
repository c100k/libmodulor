import { ucfIsMandatory, ucfRepeatability, } from './cardinality.js';
import { ucfExamples } from './examples.js';
export function ucofExamples(def) {
    return ucfExamples(def.type);
}
export function ucofIsMandatory(def) {
    return ucfIsMandatory(def.cardinality);
}
export function ucofRepeatability(def) {
    return ucfRepeatability(def.cardinality);
}
