import {
    createContext,
    type PropsWithChildren,
    useContext,
    useState,
} from 'react';

import type {
    AppManifest,
    ErrorMessage,
    UC,
} from '../../../../../../dist/esm/index.js';
import {
    UCEntrypoint,
    type UCPanelOnError,
    type UCPanelOnStartSubmitting,
} from '../../../../../../dist/esm/index.react.js';
import { UCEntrypointTouchable } from '../../../../../../dist/esm/index.react-web-pure.js';
import ErrMessage from './ErrMessage.js';

export interface AppContextT {
    errMsg: ErrorMessage | null;
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
    const [errMsg, setErrMsg] = useState<AppContextT['errMsg']>(null);

    const onError: UCPanelOnError = async (err) =>
        setErrMsg((err as Error).message);
    const onStartSubmitting: UCPanelOnStartSubmitting = async () =>
        setErrMsg(null);

    return (
        <AppContext.Provider value={{ errMsg, onError, onStartSubmitting }}>
            <div
                style={{
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 8,
                }}
            >
                <h2>{manifest.name}</h2>

                {menu.length > 0 && (
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                        {menu.map((uc) => (
                            <UCEntrypoint
                                key={uc.def.metadata.name}
                                path={`#${uc.def.metadata.name}`}
                                renderTouchable={UCEntrypointTouchable}
                                uc={uc}
                            />
                        ))}
                    </div>
                )}

                {errMsg && <ErrMessage errMsg={errMsg} />}

                {children}
            </div>
        </AppContext.Provider>
    );
}
