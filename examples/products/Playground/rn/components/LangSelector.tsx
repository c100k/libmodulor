import type { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

    const onPress = async (l: I18nLanguageCode) => {
        await changeLang(l);
    };

    return (
        <View style={{ flexDirection: 'row', gap: 4 }}>
            {i18nManager.availableLangs().map((l) => (
                <TouchableOpacity
                    data-value={l}
                    key={l}
                    onPress={() => onPress(l)}
                    style={{
                        borderColor:
                            l === lang ? style.colors?.primary : undefined,
                        minWidth: 48,
                    }}
                >
                    <Text>{FLAGS[l]}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
