import type { Container } from 'inversify';
import { type LoggerSettings } from '../../std/index.js';
import { type UCSettings } from '../../uc/index.js';
export type S = LoggerSettings & UCSettings;
export declare function bindCommon(container: Container): void;
export declare function updateSettings<SOverride>(container: Container, settings: Partial<S & SOverride>): void;
