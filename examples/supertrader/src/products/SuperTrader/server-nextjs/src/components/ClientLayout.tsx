'use client';

import { DIContextProvider } from 'libmodulor/react';
import React, { type PropsWithChildren, type ReactElement } from 'react';

import container from '../container-client.js';

export default function ClientLayout({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <DIContextProvider container={container}>{children}</DIContextProvider>
    );
}
