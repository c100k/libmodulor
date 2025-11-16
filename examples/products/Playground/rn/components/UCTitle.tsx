import type { ReactElement } from 'react';

import type { UC, UCInput, UCOPIBase } from '../../../../../dist/esm/index.js';
import {
    UCContainer,
    useDIContext,
} from '../../../../../dist/esm/index.react.js';
import H3 from './base/H3.js';

interface Props<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
> {
    uc: UC<I, OPI0, OPI1>;
}

export default function UCTitle<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({ uc }: Props<I, OPI0, OPI1>): ReactElement {
    const { wordingManager } = useDIContext();

    const { def } = uc;

    return (
        <UCContainer uc={uc}>
            <H3 value={wordingManager.uc(def).label} />
        </UCContainer>
    );
}
