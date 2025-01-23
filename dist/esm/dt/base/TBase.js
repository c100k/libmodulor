import { isBlank } from '../../utils/index.js';
import { Validation } from '../Validation.js';
export class TBase {
    static DEFAULT_OPTIONS = {
        shouldTranslateLabels: false,
        strict: true,
    };
    defaultValue;
    examples;
    initialValue;
    options;
    optionsOpts;
    raw;
    semanticsMapping;
    semanticsPredicate;
    assign(raw) {
        this.raw = raw;
        return this;
    }
    autoCapitalizeBehavior() {
        return undefined;
    }
    clear() {
        this.raw = undefined;
    }
    example() {
        throw new Error('An example must be defined');
    }
    fmt(ifNullOrUndefined = '-') {
        const val = this.val();
        if (val === undefined || val === null) {
            return ifNullOrUndefined;
        }
        return `${val}`;
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    getExamples() {
        return this.examples;
    }
    getInitialValue() {
        return this.initialValue;
    }
    getOptions() {
        return this.options;
    }
    getSemanticsMapping() {
        return this.semanticsMapping;
    }
    getSemanticsPredicate() {
        return this.semanticsPredicate;
    }
    hasOptions() {
        return !isBlank(this.options);
    }
    hasStrictOptions() {
        return this.optionsOpts?.strict ?? TBase.DEFAULT_OPTIONS.strict;
    }
    htmlInputType() {
        return 'text';
    }
    isSensitive() {
        return false;
    }
    rnInputMode() {
        return 'text';
    }
    setDefaultValue(defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }
    setExamples(examples) {
        this.examples = examples;
        return this;
    }
    setInitialValue(initialValue) {
        this.initialValue = initialValue;
        return this;
    }
    restrictOptions(v) {
        this.options = this.options?.filter((o) => v.includes(o.value));
        return this;
    }
    setOptions(options, opts) {
        this.options = options;
        this.optionsOpts = opts;
        if (this.options.length > 0 && this.options[0]) {
            this.setExamples([this.options[0].value]);
        }
        return this;
    }
    setSemanticsMapping(semanticsMapping) {
        this.semanticsMapping = semanticsMapping;
        return this;
    }
    setSemanticsPredicate(semanticsPredicate) {
        this.semanticsPredicate = semanticsPredicate;
        return this;
    }
    shouldTranslateOptions() {
        return (this.optionsOpts?.shouldTranslateLabels ??
            TBase.DEFAULT_OPTIONS.shouldTranslateLabels);
    }
    val() {
        return this.raw;
    }
    validate() {
        const validation = new Validation();
        if (this.options &&
            this.hasStrictOptions() &&
            !this.options.find((o) => o.value === this.raw)) {
            validation.add({
                constraint: 'oneOf',
                expected: this.options.map((o) => o.value),
            });
        }
        return validation;
    }
}
