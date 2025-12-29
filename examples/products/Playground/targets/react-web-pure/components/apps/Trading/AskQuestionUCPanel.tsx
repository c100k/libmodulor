import { type ReactElement, useState } from 'react';

import { useUC } from '../../../../../../../../dist/esm/index.react.js';
import {
    AskQuestionUCD,
    Manifest,
} from '../../../../../../../apps/Trading/index.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

export default function AskQuestionUCPanel(): ReactElement {
    const { auth } = useGlobalContext();

    const [uc] = useUC(Manifest, AskQuestionUCD, auth);

    const [stream, setStream] = useState<string | null>(null);
    const [streamDone, setStreamDone] = useState(false);

    return (
        <div>
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

            {stream && (
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {stream}

                    {streamDone && '\n\n/// END OF TRANSMISSION'}
                </pre>
            )}
        </div>
    );
}
