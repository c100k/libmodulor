import type { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import type { UC, UCInput, UCOPIBase } from '../../../../../dist/esm/index.js';
import UCTitle from './UCTitle.js';

interface Props<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
> {
    uc: UC<I, OPI0, OPI1>;
}

export default function AppSection<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({ children, uc }: PropsWithChildren<Props<I, OPI0, OPI1>>): ReactElement {
    return (
        <View style={{ gap: 4 }}>
            <UCTitle uc={uc} />
            {children}
        </View>
    );
}
