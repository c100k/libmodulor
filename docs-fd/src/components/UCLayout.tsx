'use client';

import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type LLMManager,
    MistralAILLMManager,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { DIContextProvider, StyleContextProvider } from 'libmodulor/react';
import { bindWeb } from 'libmodulor/web';
import React, { type PropsWithChildren, type ReactElement } from 'react';

import { I18n } from './products/Main/i18n';
import { Manifest } from './products/Main/manifest';
import { style } from './style';

const container = new Container(CONTAINER_OPTS);
bindCommon(container);
bindProduct(container, Manifest, I18n);
bindWeb(container);

container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);

export default function UCLayout({
    children,
}: PropsWithChildren): ReactElement | null {
    return (
        <DIContextProvider container={container}>
            <StyleContextProvider {...style}>{children}</StyleContextProvider>
        </DIContextProvider>
    );
}
