import type { ReactElement } from 'react';

import type { UCInput, UCOPIBase } from '../../../../../dist/esm/index.js';
import {
    UCPanel as UCPanelBase,
    type UCPanelProps,
} from '../../../../../dist/esm/index.react.js';
import {
    UCExecTouchable,
    UCForm,
} from '../../../../../dist/esm/index.react-web-pure.js';
import { useAppContext } from './AppContext.js';
import UCAutoExecLoader from './UCAutoExecLoader.js';

type Props<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
> = Pick<
    UCPanelProps<I, OPI0, OPI1>,
    'autoExec' | 'onDone' | 'onError' | 'onStartSubmitting' | 'stream' | 'uc'
>;

export default function UCPanel<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>(props: Props<I, OPI0, OPI1>): ReactElement {
    const { onError, onStartSubmitting } = useAppContext();

    return (
        <UCPanelBase
            onError={onError}
            onStartSubmitting={async () => {
                await onStartSubmitting();
                await props.onStartSubmitting?.();
            }}
            renderAutoExecLoader={UCAutoExecLoader}
            renderExecTouchable={UCExecTouchable}
            renderForm={UCForm}
            {...props}
        />
    );
}
