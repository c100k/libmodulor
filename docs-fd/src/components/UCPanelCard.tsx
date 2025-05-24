'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import type {
    AppManifest,
    AppName,
    ErrorMessage,
    UCDef,
    UCName,
    UCOutputReader,
} from 'libmodulor';
import { UCPanel, useDIContext, useUC } from 'libmodulor/react';
import React, { Suspense, useEffect, useState, type ReactElement } from 'react';

import { Manifest as ToolboxManifest } from './apps/Toolbox/manifest';
import { GenerateMiscDataUCD } from './apps/Toolbox/ucds/GenerateMiscDataUCD';
import { UCAutoExecLoader } from './atoms/UCAutoExecLoader';
import { UCExecTouchable } from './atoms/UCExecTouchable';
import { UCForm } from './atoms/UCForm';

interface Props {
    appName: AppName;
    ucName: UCName;
}

const APPS_MAPPING: Map<AppName, AppManifest> = new Map([
    [ToolboxManifest.name, ToolboxManifest],
]);

// biome-ignore lint/suspicious/noExplicitAny: can be anything
const UCDS_MAPPING: Map<UCName, UCDef<any, any, any>> = new Map([
    [GenerateMiscDataUCD.metadata.name, GenerateMiscDataUCD],
]);

export default function UCPanelCard({
    appName,
    ucName,
}: Props): ReactElement | null {
    const appManifest = APPS_MAPPING.get(appName);
    const ucd = UCDS_MAPPING.get(ucName);

    if (!appManifest || !ucd) {
        return null;
    }

    const { i18nManager, wordingManager } = useDIContext();

    const [errMsg, setErrMsg] = useState<ErrorMessage | null>(null);
    const [uc] = useUC(appManifest, ucd, null);
    const [ucor, setUCOR] = useState<UCOutputReader | null>(null);

    useEffect(() => {
        (async () => {
            await i18nManager.init();
        })();
    }, [i18nManager]);

    const { desc, label } = wordingManager.uc(ucd);

    const code = ucor
        ? JSON.stringify(ucor.output(), null, 2)
        : '{ "//": "Execute the use case on the left to see the output here" }';

    return (
        <Suspense>
            <h2>{label}</h2>

            {desc && <p>{desc}</p>}

            {errMsg && <p>{errMsg}</p>}

            <div className="flex gap-3 justify-between">
                <div className="min-w-1/3">
                    <UCPanel
                        clearAfterExec={false}
                        onDone={async (ucor) => setUCOR(ucor)}
                        onError={async (err) =>
                            setErrMsg((err as Error).message)
                        }
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        uc={uc}
                    />
                </div>
                <div className="min-w-2/3">
                    <DynamicCodeBlock code={code} lang="json" />
                </div>
            </div>
        </Suspense>
    );
}
