'use client';

import type { PropsWithChildren, ReactElement } from 'react';

import {
    DIContextProvider,
    StyleContextProvider,
} from '../../../../../../dist/esm/index.react.js';
import { style } from '../../../spa/style.js';
import container from '../container-client.js';

export default function ClientLayout({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <DIContextProvider container={container}>
            <StyleContextProvider {...style}>{children}</StyleContextProvider>
        </DIContextProvider>
    );
}
