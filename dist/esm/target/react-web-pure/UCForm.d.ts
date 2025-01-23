import { type ReactElement } from 'react';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
import type { UCFormProps } from '../lib/react/form.js';
export declare function UCForm<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ clearAfterExec, disabled, execState, onChange, onSubmit: onSubmitBase, uc, }: UCFormProps<I, OPI0, OPI1>): ReactElement;
