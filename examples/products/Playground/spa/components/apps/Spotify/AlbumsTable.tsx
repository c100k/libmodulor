import { type ReactElement, useState } from 'react';

import {
    UC,
    type UCOutputReaderPart,
    type UIntDuration,
    type UUID,
} from '../../../../../../../dist/esm/index.js';
import {
    type RemoveFunc,
    useDIContext,
} from '../../../../../../../dist/esm/index.react.js';
import { UCOutputFieldValue } from '../../../../../../../dist/esm/index.react-web-pure.js';
import {
    type AlbumOPI0,
    DeleteAlbumUCD,
    Manifest,
    PlaySongUCD,
} from '../../../../../../apps/Spotify/index.js';
import UCPanel from '../../UCPanel.js';

interface Props {
    listAlbumsPart0: UCOutputReaderPart<AlbumOPI0>;
    remove0: RemoveFunc<AlbumOPI0>;
}

export default function AlbumsTable({
    listAlbumsPart0,
    remove0,
}: Props): ReactElement {
    const { wordingManager } = useDIContext();

    const [playingSongId, setPlayingSongId] = useState<UUID | null>(null);
    const [seconds, setSeconds] = useState<UIntDuration | null>(null);

    const { fields, items } = listAlbumsPart0;

    return (
        <table>
            <thead>
                <tr>
                    <th>#️⃣</th>
                    {fields.map((f) => (
                        <th key={f.key}>{wordingManager.ucof(f.key).label}</th>
                    ))}
                    <th
                        style={{
                            minWidth: 150,
                        }}
                    >
                        🛠️
                    </th>
                    <th>▶️</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, idx) => (
                    <tr key={item.id}>
                        <td>{idx + 1}</td>
                        {fields.map((f) => (
                            <td key={f.key}>
                                <UCOutputFieldValue f={f} value={item[f.key]} />
                            </td>
                        ))}
                        <td>
                            <div style={{ display: 'inline-flex', gap: 4 }}>
                                <UCPanel
                                    onDone={async () => {
                                        if (playingSongId === item.id) {
                                            setPlayingSongId(null);
                                            setSeconds(null);
                                        }
                                        remove0(item);
                                    }}
                                    uc={new UC(
                                        Manifest,
                                        DeleteAlbumUCD,
                                        null,
                                    ).fill({ id: item.id })}
                                />
                                <UCPanel
                                    onDone={async () => {
                                        setPlayingSongId(null);
                                        setSeconds(null);
                                    }}
                                    stream={{
                                        onClose: async () => {},
                                        onData: async (ucor) => {
                                            setPlayingSongId(item.id);
                                            setSeconds(
                                                ucor.item00().item.duration
                                                    .seconds,
                                            );
                                            // TODO : Close stream when deleted : probably need a StopSongUCD
                                        },
                                        onDone: async () => {},
                                    }}
                                    uc={new UC(
                                        Manifest,
                                        PlaySongUCD,
                                        null,
                                    ).fill({
                                        id: item.id,
                                    })}
                                />
                            </div>
                        </td>
                        <td>
                            {playingSongId === item.id &&
                                seconds !== null &&
                                `🎶 ${seconds}s`}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
