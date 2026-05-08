import type { AppName } from '../app/index.js';
import { UC_INPUT_SUFFIX, UC_OPI0_SUFFIX, UC_OPI1_SUFFIX } from '../convention.js';
import type { IconCode } from '../icon/index.js';
/**
 * The type of action the use case performs
 *
 * This impacts the HTTP verb used in the transport layer for example.
 */
export type UCAction = 'Create' | 'Delete' | 'List' | 'Search' | 'Update' | 'View';
export type UCName = Capitalize<string>;
export type FQUCNameSeparator = '_';
/**
 * Fully qualified use case name
 *
 * It's made with the {@link AppName} and the {@link UCName} linked by {@link FQUCNameSeparator}.
 */
export type FQUCName = `${AppName}${FQUCNameSeparator}${UCName}`;
export type FQUCInputName = `${FQUCName}${typeof UC_INPUT_SUFFIX}`;
export type FQUCOPI0Name = `${FQUCName}${typeof UC_OPI0_SUFFIX}`;
export type FQUCOPI1Name = `${FQUCName}${typeof UC_OPI1_SUFFIX}`;
export interface UCMetadata {
    action: UCAction;
    beta?: boolean;
    icon: IconCode;
    name: UCName;
    new?: boolean;
    sensitive?: boolean;
}
export declare const FQ_UC_NAME_SEPARATOR: FQUCNameSeparator;
export declare function formatFQUCName(appName: AppName, ucName: UCName): FQUCName;
export declare function formatFQUCInputName(fqUCName: FQUCName): FQUCInputName;
export declare function formatFQUCOPI0Name(fqUCName: FQUCName): FQUCOPI0Name;
export declare function formatFQUCOPI1Name(fqUCName: FQUCName): FQUCOPI1Name;
export declare function parseFQUCName(value: string): [AppName, UCName];
