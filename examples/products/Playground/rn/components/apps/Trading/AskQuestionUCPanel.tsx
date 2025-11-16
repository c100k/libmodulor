import { type ReactElement, useState } from 'react';
import { Text, View } from 'react-native';

import {
    useDIContext,
    useUC,
} from '../../../../../../../dist/esm/index.react.js';
import {
    AskQuestionUCD,
    Manifest,
} from '../../../../../../apps/Trading/index.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

export default function AskQuestionUCPanel(): ReactElement {
    const { i18nManager } = useDIContext();
    const { auth } = useGlobalContext();

    const [uc] = useUC(Manifest, AskQuestionUCD, auth);

    const [stream, setStream] = useState<string | null>(null);
    const [streamDone, setStreamDone] = useState(false);

    return (
        <View style={{ gap: 4 }}>
            <UCPanel
                onStartSubmitting={async () => {
                    setStream(null);
                    setStreamDone(false);
                }}
                stream={{
                    onClose: async () => {},
                    onData: async (ucor) => {
                        setStream(
                            (prev) => `${prev ?? ''}${ucor.item00().item.res}`,
                        );
                    },
                    onDone: async () => {
                        setStreamDone(true);
                    },
                }}
                uc={uc}
            />

            <Text style={{ color: 'gray' }}>
                {i18nManager.t('sse_unavailable')}
            </Text>

            {stream && (
                <Text>
                    {stream}

                    {streamDone && '\n\n/// END OF TRANSMISSION'}
                </Text>
            )}
        </View>
    );
}
