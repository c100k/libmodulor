import React, { type PropsWithChildren, type ReactElement } from 'react';
import type { Color } from '../../../dt/index.js';
export interface StyleDef {
    className?: string | undefined;
    style?: Record<string, unknown> | undefined;
}
export type SelectiveStyleDefKey = 'default' | (string & {});
export interface StyleContextT {
    autoExecLoader?: StyleDef | undefined;
    colors?: {
        onPrimary: Color;
        primary: Color;
    };
    entrypointTouchable?: StyleDef | undefined;
    execTouchable?: StyleDef | undefined;
    form?: StyleDef | undefined;
    formField?: StyleDef | undefined;
    formFieldControl?: Record<SelectiveStyleDefKey, StyleDef | undefined>;
    formFieldDesc?: StyleDef | undefined;
    formFieldErr?: StyleDef | undefined;
    formFieldLabel?: StyleDef | undefined;
    formSubmitControl?: StyleDef | undefined;
    outputFieldValue?: StyleDef | undefined;
}
export declare const StyleContext: React.Context<StyleContextT | null>;
export declare function useStyleContext(): StyleContextT;
type Props = StyleContextT;
export declare function StyleContextProvider({ children, ...rest }: PropsWithChildren<Props>): ReactElement;
export declare function styleDef(def: StyleContextT['formFieldControl'], k1: SelectiveStyleDefKey, fallback?: SelectiveStyleDefKey | undefined): StyleDef;
export {};
