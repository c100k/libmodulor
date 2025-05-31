'use client';

import { DIContextProvider, StyleContextProvider } from 'libmodulor/react';
import React, { type PropsWithChildren, type ReactElement } from 'react';

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
