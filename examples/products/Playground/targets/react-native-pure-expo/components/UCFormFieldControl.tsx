import type { ReactElement } from 'react';

import {
    type DataType,
    type File,
    TFile,
    type Year,
} from '../../../../../../dist/esm/index.js';
import type { UCFormFieldControlProps } from '../../../../../../dist/esm/index.react.js';
import FilePicker from './FilePicker.jsx';
import Slider from './Slider.jsx';

export default function UCFormFieldControl<T extends DataType>(
    props: UCFormFieldControlProps<T>,
): ReactElement | null {
    const { f } = props;
    const {
        def: { type },
        key,
    } = f;

    if (key === 'releaseYear') {
        return (
            <Slider {...(props as unknown as UCFormFieldControlProps<Year>)} />
        );
    }

    if (type instanceof TFile) {
        return (
            <FilePicker
                {...(props as unknown as UCFormFieldControlProps<File>)}
            />
        );
    }

    return null;
}
