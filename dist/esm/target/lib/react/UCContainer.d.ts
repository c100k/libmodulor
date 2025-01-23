import { type PropsWithChildren, type ReactElement } from 'react';
import { type UC, type UCInput, type UCOPIBase } from '../../../uc/index.js';
export interface Props<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    uc: UC<I, OPI0, OPI1>;
}
export declare function UCContainer<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ children, uc, }: PropsWithChildren<Props<I, OPI0, OPI1>>): ReactElement | null;
