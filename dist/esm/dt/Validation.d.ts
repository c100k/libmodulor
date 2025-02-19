import type { I18nTranslation } from '../i18n/index.js';
import type { NumIndex } from './final/TNumIndex.js';
type ViolationConstraint = 'fieldsOr' | 'format' | 'mandatory' | 'max' | 'maxCount' | 'maxLength' | 'min' | 'minCount' | 'minLength' | 'oneOf' | 'shape' | 'type';
type ViolationBase<C extends ViolationConstraint, EV> = {
    constraint: C;
    expected: EV;
};
export type ViolationFormat = 'ColorRGBA' | 'DateISO8601' | 'DirPath' | 'DomainName' | 'Email' | 'FilePath' | 'GitSSHURL' | 'IPv4' | 'IPv6' | 'JSON' | 'JWT' | 'PersonFirstname' | 'PersonFullname' | 'PersonInitials' | 'PersonLastname' | 'QRCode' | 'SemVerVersion' | 'Slug' | 'SSHPrivateKey' | 'SSHPublicKey' | 'Time' | 'URL' | 'UUID';
export type ViolationType = 'array' | 'boolean' | 'int' | 'number' | 'object' | 'scalar' | 'string';
export type Violation<T = unknown> = ViolationBase<'fieldsOr', string> | ViolationBase<'format', ViolationFormat> | ViolationBase<'format', string> | ViolationBase<'mandatory', undefined> | ViolationBase<'max', number> | ViolationBase<'maxCount', number> | ViolationBase<'maxLength', number> | ViolationBase<'min', number> | ViolationBase<'minCount', number> | ViolationBase<'minLength', number> | ViolationBase<'oneOf', T[]> | ViolationBase<'shape', object> | ViolationBase<'type', ViolationType>;
type ViolationI18nableSimple = Exclude<ViolationConstraint, 'format' | 'type'>;
export type ViolationI18nable = `validation_${ViolationI18nableSimple}` | `validation_format_${ViolationFormat}` | `validation_type_${ViolationType}`;
export type ViolationI18n = Record<ViolationI18nable, I18nTranslation>;
export declare class Validation {
    private violations;
    constructor();
    add(violation: Violation): void;
    concat(validation: Validation): void;
    get(idx?: NumIndex): [ViolationI18nable, string] | null;
    getViolations(): Violation[];
    getViolationsAsI18nables(): ViolationI18nable[];
    /**
     * Check whether the validation has succeeded or not
     *
     * If you want to get a violation, use directly {@link get} and check if it's null.
     * No need to check if `!validation.isOK()` and then call `validation.get()`.
     *
     * @returns
     */
    isOK(): boolean;
    private violationAsI18nable;
}
export {};
