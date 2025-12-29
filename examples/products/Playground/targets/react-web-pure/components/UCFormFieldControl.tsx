import type { ReactElement } from 'react';

import type { DataType, Year } from '../../../../../../dist/esm/index.js';
import type { UCFormFieldControlProps } from '../../../../../../dist/esm/index.react.js';
import Slider from './Slider.js';

export default function UCFormFieldControl<T extends DataType>(
    props: UCFormFieldControlProps<T>,
): ReactElement | null {
    if (props.f.key === 'releaseYear') {
        return (
            <Slider {...(props as unknown as UCFormFieldControlProps<Year>)} />
        );
    }

    return null;
}
