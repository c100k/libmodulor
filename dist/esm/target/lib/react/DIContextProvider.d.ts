import type { Container } from 'inversify';
import React, { type PropsWithChildren, type ReactElement } from 'react';
import { WordingManager } from '../../../i18n/index.js';
import type { I18nManager } from '../../../std/index.js';
export interface DIContextT {
    container: Container;
    i18nManager: I18nManager;
    wordingManager: WordingManager;
}
export declare const DIContext: React.Context<DIContextT | null>;
export declare function useDIContext(): DIContextT;
interface Props {
    container: Container;
}
export declare function DIContextProvider({ children, container, }: PropsWithChildren<Props>): ReactElement;
export {};
