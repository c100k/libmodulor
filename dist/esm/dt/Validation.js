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
