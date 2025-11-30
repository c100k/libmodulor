import type { MouseEventHandler, ReactElement } from 'react';

import type { Emoji, I18nLanguageCode } from '../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../dist/esm/index.react.js';
import { style } from '../style.js';
import { useGlobalContext } from './GlobalContext.js';

const FLAGS: Record<I18nLanguageCode, Emoji> = {
    de: '🇩🇪',
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷',
};

export default function LangSelector(): ReactElement {
    const { i18nManager } = useDIContext();
    const { changeLang, lang } = useGlobalContext();

    const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        const { value } = e.currentTarget.dataset;
        if (!value) {
            return;
        }
        await changeLang(value as I18nLanguageCode);
    };

    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {i18nManager.availableLangs().map((l) => (
                <button
                    data-value={l}
                    key={l}
                    onClick={onClick}
                    style={{
                        borderColor:
                            l === lang ? style.colors?.primary : undefined,
                        minWidth: 48,
                    }}
                    type="button"
                >
                    {FLAGS[l]}
                </button>
            ))}
        </div>
    );
}
