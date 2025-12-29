import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useContext,
    useState,
} from 'react';

import type {
    I18nLanguageCode,
    I18nManager,
    UCAuth,
} from '../../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../../dist/esm/index.react.js';

export interface GlobalContextT {
    auth: UCAuth | null;
    changeLang: I18nManager['changeLang'];
    lang: I18nLanguageCode;
    setAuth: Dispatch<SetStateAction<UCAuth | null>>;
}

export const GlobalContext = createContext<GlobalContextT>(
    // @ts-expect-error : must pass an initial value
    undefined,
);

export function useGlobalContext(): GlobalContextT {
    return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }: PropsWithChildren) {
    const { i18nManager } = useDIContext();

    const [auth, setAuth] = useState<GlobalContextT['auth']>(null);
    const [lang, setLang] = useState<I18nLanguageCode>(i18nManager.l());

    const changeLang = async (l: I18nLanguageCode) => {
        await i18nManager.changeLang(l);
        setLang(l);
    };

    return (
        <GlobalContext.Provider value={{ auth, changeLang, lang, setAuth }}>
            {children}
        </GlobalContext.Provider>
    );
}
