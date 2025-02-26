import { type ReactElement } from 'react';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
import type { UCFormSubmitControlProps } from '../lib/react/form.js';
export declare function UCFormSubmitControl<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ execState, disabled, uc, }: UCFormSubmitControlProps<I, OPI0, OPI1>): ReactElement;
