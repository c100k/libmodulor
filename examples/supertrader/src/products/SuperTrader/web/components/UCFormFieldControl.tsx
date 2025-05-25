import type { DataType } from 'libmodulor';
import type { UCFormFieldControlProps } from 'libmodulor/react';
import { UCFormFieldControl as UCFormFieldControlBase } from 'libmodulor/react-web-pure';
import { htmlInputDef } from 'libmodulor/web';
import React, { type ReactElement } from 'react';

export function UCFormFieldControl<T extends DataType>(
    props: UCFormFieldControlProps<T>,
): ReactElement {
    const { errMsg, execState, f } = props;
    const attrs = htmlInputDef(f, execState, errMsg ?? null, undefined);

    let className = undefined;
    if (attrs.internal?.multiline) {
        className = 'textarea';
    }

    const { type } = f.def;
    const options = type.getOptions();
    if (options) {
        className = 'select';
    }

    className = 'input';
    return <UCFormFieldControlBase {...props} className={className} />;
}
