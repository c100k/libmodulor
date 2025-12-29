import { type ReactElement, useState } from 'react';
import { Text, View } from 'react-native';

import {
    UC,
    type UCOutputReaderPart,
    type UIntDuration,
    type UUID,
} from '../../../../../../../../dist/esm/index.js';
import type { RemoveFunc } from '../../../../../../../../dist/esm/index.react.js';
import {
    type AlbumOPI0,
    DeleteAlbumUCD,
    Manifest,
    PlaySongUCD,
} from '../../../../../../../apps/Spotify/index.js';
import UCOPICard from '../../UCOPICard.jsx';
import UCPanel from '../../UCPanel.jsx';

interface Props {
    listAlbumsPart0: UCOutputReaderPart<AlbumOPI0>;
    remove0: RemoveFunc<AlbumOPI0>;
}

export default function AlbumsList({
    listAlbumsPart0,
    remove0,
}: Props): ReactElement {
    const [playingSongId, setPlayingSongId] = useState<UUID | null>(null);
    const [seconds, setSeconds] = useState<UIntDuration | null>(null);

    const { fields, items } = listAlbumsPart0;

    return (
        <View style={{ gap: 8 }}>
            {items.map((item, idx) => (
                <View key={item.id} style={{ gap: 8 }}>
                    <View>
                        <UCOPICard fields={fields} idx={idx} item={item} />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <UCPanel
                            onDone={async () => {
                                if (playingSongId === item.id) {
                                    setPlayingSongId(null);
                                    setSeconds(null);
                                }
                                remove0(item);
                            }}
                            uc={new UC(Manifest, DeleteAlbumUCD, null).fill({
                                id: item.id,
                            })}
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
                                        ucor.item00().item.duration.seconds,
                                    );
                                    // TODO : Close stream when deleted : probably need a StopSongUCD
                                },
                                onDone: async () => {},
                            }}
                            uc={new UC(Manifest, PlaySongUCD, null).fill({
                                id: item.id,
                            })}
                        />
                    </View>
                    <View>
                        {playingSongId === item.id && seconds !== null && (
                            <Text>{seconds}</Text>
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
}
