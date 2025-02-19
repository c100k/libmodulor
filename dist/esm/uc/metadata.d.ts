import type { AppName } from '../app/index.js';
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
export declare function parseFQUCName(value: string): [AppName, UCName];
