export class Validation {
    violations;
    constructor() {
        this.violations = [];
    }
    add(violation) {
        this.violations.push(violation);
    }
    concat(validation) {
        this.violations.push(...validation.getViolations());
    }
    get(idx = 0) {
        const violation = this.violations[idx];
        if (!violation) {
            return null;
        }
        const key = this.violationAsI18nable(violation);
        const expected = (violation.expected || '').toString();
        return [key, expected];
    }
    getViolations() {
        return this.violations;
    }
    getViolationsAsI18nables() {
        return this.violations.map((v) => this.violationAsI18nable(v));
    }
    /**
     * Check whether the validation has succeeded or not
     *
     * If you want to get a violation, use directly {@link get} and check if it's null.
     * No need to check if `!validation.isOK()` and then call `validation.get()`.
     *
     * @returns
     */
    isOK() {
        return this.violations.length === 0;
    }
    violationAsI18nable(violation) {
        const { constraint, expected } = violation;
        const elements = ['validation', constraint];
        const constraintsIncludingExpected = [
            'format',
            'type',
        ];
        if (constraintsIncludingExpected.includes(constraint)) {
            elements.push(expected);
        }
        return elements.join('_');
    }
}
