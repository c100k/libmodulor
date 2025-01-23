import type { DataType } from '../../dt/index.js';
import type { WordingManager } from '../../i18n/index.js';
import type { UCInputField } from '../UCInputField.js';
import type { UCOutputField } from '../UCOutputField.js';
import type { UCOPIBase } from '../opi.js';
export declare function fmtInputVal<T extends DataType>(wordingManager: WordingManager, field: UCInputField<T>, ifNullOrUndefined?: string | undefined): [string, string | null, string];
export declare function fmtOPIVal<OPI extends UCOPIBase, T extends DataType>(wordingManager: WordingManager, field: UCOutputField<OPI, T>, item: OPI | null, ifNullOrUndefined?: string | undefined): [string, string | null, string];
