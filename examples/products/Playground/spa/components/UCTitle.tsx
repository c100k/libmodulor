import type { ReactElement } from 'react';

import type { UC, UCInput, UCOPIBase } from '../../../../../dist/esm/index.js';
import {
    UCContainer,
    useDIContext,
} from '../../../../../dist/esm/index.react.js';

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
    const {
        metadata: { name },
    } = def;

    return (
        <UCContainer uc={uc}>
            <h3 id={name}>{wordingManager.uc(def).label}</h3>
        </UCContainer>
    );
}
