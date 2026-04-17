import {
    createContext,
    type PropsWithChildren,
    useContext,
    useState,
} from 'react';
import { View } from 'react-native';

import type {
    AppManifest,
    ErrorCode,
    UC,
} from '../../../../../../dist/esm/index.js';
import {
    UCEntrypoint,
    type UCPanelOnError,
    type UCPanelOnStartSubmitting,
} from '../../../../../../dist/esm/index.react.js';
import { UCEntrypointTouchable } from '../../../../../../dist/esm/index.react-native-pure.js';
import H2 from './base/H2.jsx';
import ErrMessage from './ErrMessage.jsx';

export interface AppContextT {
    errCode: ErrorCode | null;
    onError: UCPanelOnError;
    onStartSubmitting: UCPanelOnStartSubmitting;
}

export const AppContext = createContext<AppContextT>(
    // @ts-expect-error : must pass an initial value
    undefined,
);

export function useAppContext(): AppContextT {
    return useContext(AppContext);
}

interface Props {
    manifest: AppManifest;
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    menu: UC<any, any, any>[];
}

export function AppContextProvider({
    children,
    manifest,
    menu,
}: PropsWithChildren<Props>) {
    const [errCode, setErrCode] = useState<AppContextT['errCode']>(null);

    const onError: UCPanelOnError = async (err) =>
        setErrCode((err as Error).message as ErrorCode);
    const onStartSubmitting: UCPanelOnStartSubmitting = async () =>
        setErrCode(null);

    return (
        <AppContext.Provider value={{ errCode, onError, onStartSubmitting }}>
            <View
                style={{
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: 8,
                }}
            >
                <H2 value={manifest.name} />

                {menu.length > 0 && (
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        {menu.map((uc) => (
                            <UCEntrypoint
                                key={uc.def.metadata.name}
                                path={`#${uc.def.metadata.name}`}
                                renderTouchable={UCEntrypointTouchable}
                                uc={uc}
                            />
                        ))}
                    </View>
                )}

                {errCode && <ErrMessage errCode={errCode} />}

                {children}
            </View>
        </AppContext.Provider>
    );
}
