import { type UCAuth } from '../uc/index.js';
export declare const DEFAULT_UC_AUTH_SETTERS: readonly ["ANONYMOUS", "ADMIN", "REGULAR"];
export type DefaultUCAuthSetter = (typeof DEFAULT_UC_AUTH_SETTERS)[number];
export type CustomUCAuthSetter = Capitalize<string>;
export type UCAuthSetterName = DefaultUCAuthSetter | CustomUCAuthSetter;
export type UCAuthSetterSet<T extends UCAuthSetterName = UCAuthSetterName> = Record<T, UCAuth | null>;
export declare function defaultUCAuthSetters(): UCAuthSetterSet;
