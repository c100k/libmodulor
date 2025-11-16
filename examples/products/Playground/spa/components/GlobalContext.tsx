import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useContext,
    useState,
} from 'react';

import type { UCAuth } from '../../../../../dist/esm/index.js';

export interface GlobalContextT {
    auth: UCAuth | null;
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
    const [auth, setAuth] = useState<GlobalContextT['auth']>(null);

    return (
        <GlobalContext.Provider value={{ auth, setAuth }}>
            {children}
        </GlobalContext.Provider>
    );
}
