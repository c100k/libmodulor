import type { ReactElement } from 'react';

import { UCOutputReader } from '../../../../../../../dist/esm/index.js';
import {
    UCContainer,
    useUC,
    useUCOR,
} from '../../../../../../../dist/esm/index.react.js';
import {
    CreateAlbumUCD,
    ListAlbumsUCD,
    Manifest,
} from '../../../../../../apps/Spotify/index.js';
import { AppContextProvider } from '../../AppContext.js';
import AppSection from '../../AppSection.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';
import AlbumsTable from './AlbumsTable.js';

export default function SpotifyApp(): ReactElement {
    const { auth } = useGlobalContext();

    const [createAlbumUC] = useUC(Manifest, CreateAlbumUCD, auth);
    const [listAlbumsUC] = useUC(Manifest, ListAlbumsUCD, auth);

    const [listAlbumsPart0, _listAlbumsPart1, { append0, remove0 }] = useUCOR(
        new UCOutputReader(listAlbumsUC.def, undefined),
    );

    return (
        <AppContextProvider
            manifest={Manifest}
            menu={[createAlbumUC, listAlbumsUC]}
        >
            <AppSection uc={createAlbumUC}>
                <UCPanel
                    onDone={async (ucor) => append0(ucor)}
                    uc={createAlbumUC}
                />
            </AppSection>

            <AppSection uc={listAlbumsUC}>
                <UCPanel
                    autoExec={true}
                    onDone={async (ucor) => append0(ucor)}
                    uc={listAlbumsUC}
                />
                <UCContainer uc={listAlbumsUC}>
                    <AlbumsTable
                        listAlbumsPart0={listAlbumsPart0}
                        remove0={remove0}
                    />
                </UCContainer>
            </AppSection>
        </AppContextProvider>
    );
}
