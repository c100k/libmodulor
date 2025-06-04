'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import {
    type AppManifest,
    type AppName,
    type ErrorMessage,
    UC_DEF_FILE_NAME_SUFFIX,
    type UCDef,
    type UCName,
    type UCOutputReader,
} from 'libmodulor';
import { UCPanel, useDIContext, useUC } from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-web-pure';
import { type ReactElement, useEffect, useState } from 'react';

import { Manifest as ToolboxManifest } from './apps/Toolbox/manifest';
import { ExportAsanaUCD } from './apps/Toolbox/ucds/ExportAsanaUCD';
import { GenerateMiscDataUCD } from './apps/Toolbox/ucds/GenerateMiscDataUCD';
import { PromptLLMUCD } from './apps/Toolbox/ucds/PromptLLMUCD';

interface Props {
    appName: AppName;
    ucName: UCName;
}

const APPS_MAPPING: Map<AppName, AppManifest> = new Map([
    [ToolboxManifest.name, ToolboxManifest],
]);

// biome-ignore lint/suspicious/noExplicitAny: can be anything
const UCDS_MAPPING: Map<UCName, UCDef<any, any, any>> = new Map<
    UCName,
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    UCDef<any, any, any>
>([
    [ExportAsanaUCD.metadata.name, ExportAsanaUCD],
    [GenerateMiscDataUCD.metadata.name, GenerateMiscDataUCD],
    [PromptLLMUCD.metadata.name, PromptLLMUCD],
]);

export default function UCPanelCard({
    appName,
    ucName,
}: Props): ReactElement | null {
    const appManifest = APPS_MAPPING.get(appName);
    const ucd = UCDS_MAPPING.get(ucName);

    const { i18nManager, wordingManager } = useDIContext();

    const [errMsg, setErrMsg] = useState<ErrorMessage | null>(null);
    const [initializing, setInitializing] = useState(true);
    // biome-ignore lint/style/noNonNullAssertion: to avoid conditional hooks error (not ideal but not a big deal)
    const [uc] = useUC(appManifest!, ucd!, null);
    const [ucor, setUCOR] = useState<UCOutputReader | null>(null);

    useEffect(() => {
        (async () => {
            await i18nManager.init();
            setInitializing(false);
        })();
    }, [i18nManager]);

    if (!appManifest || !ucd) {
        return null;
    }

    const { desc, label } = wordingManager.uc(ucd);

    const code = ucor
        ? JSON.stringify(ucor.output(), null, 2)
        : '{ "//": "Execute the use case on the left to see the output here" }';

    if (initializing) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2>{label}</h2>
                <a
                    href={`https://github.com/c100k/libmodulor/blob/master/docs-fd/src/components/apps/${appName}/ucds/${ucName}${UC_DEF_FILE_NAME_SUFFIX}`}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    View the code
                </a>
            </div>

            {desc && <p>{desc}</p>}

            <div className="flex gap-3 justify-between">
                <div className="bg-gray-950 border min-w-2/5 p-3 rounded">
                    <UCPanel
                        clearAfterExec={false}
                        onDone={async (ucor) => setUCOR(ucor)}
                        onError={async (err) =>
                            setErrMsg((err as Error).message)
                        }
                        onStartSubmitting={async () => setErrMsg(null)}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        uc={uc}
                    />
                </div>
                <div className="flex flex-col gap-3 min-w-3/5">
                    {errMsg && (
                        <div className="bg-red-700 rounded p-2">{errMsg}</div>
                    )}

                    <DynamicCodeBlock code={code} lang="json" />
                </div>
            </div>
        </div>
    );
}
