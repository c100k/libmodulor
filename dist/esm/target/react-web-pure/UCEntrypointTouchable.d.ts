import type { ReactElement } from 'react';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
import type { UCEntrypointTouchableProps } from '../lib/react/touchable.js';
export declare function UCEntrypointTouchable<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ path, wording }: UCEntrypointTouchableProps<I, OPI0, OPI1>): ReactElement;
