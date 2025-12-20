import { getDocumentAsync } from 'expo-document-picker';
import {
    launchImageLibraryAsync,
    requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { type ReactElement, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import { type File, TFile } from '../../../../../dist/esm/index.js';
import type { UCFormFieldControlProps } from '../../../../../dist/esm/index.react.js';

export default function FilePicker({
    disabled,
    f,
    onChange: onChangeBase,
}: UCFormFieldControlProps<File>): ReactElement | null {
    const [internalValue, setInternalValue] = useState(f.getValue());

    // biome-ignore lint/correctness/useExhaustiveDependencies: It is actually necessary because only `f` or `f.getValue` does not trigger the effect
    useEffect(() => {
        setInternalValue(f.getValue());
    }, [f.getValue()]);

    const {
        def: { type },
    } = f;

    if (!(type instanceof TFile)) {
        return null;
    }

    const { accept } = type.getFileConstraints();

    const onChange = (file: File) => {
        f.setVal(file);
        setInternalValue(file);
        onChangeBase();
    };

    // TODO : Improve this condition to make it more generic
    const isImage = accept.includes('image/jpg');

    const onPress = async () => {
        if (isImage) {
            const { canAskAgain, granted } =
                await requestMediaLibraryPermissionsAsync();
            if (!granted && !canAskAgain) {
                if (!canAskAgain) {
                    Alert.alert(
                        'Allow the app to access your images from the Settings of the device',
                    );
                }
                return;
            }

            const { assets } = await launchImageLibraryAsync({
                mediaTypes: 'images',
            });
            if (!assets) {
                return;
            }

            for (const asset of assets) {
                const { fileName, fileSize, mimeType, uri } = asset;
                if (!fileName || !fileSize || !mimeType) {
                    continue;
                }
                // TODO : Handle multiple files
                onChange({
                    name: fileName,
                    size: fileSize,
                    type: mimeType,
                    uri,
                });
            }
        } else {
            const { assets } = await getDocumentAsync({
                type: accept,
            });
            if (!assets) {
                return;
            }

            for (const asset of assets) {
                const { mimeType, name, size, uri } = asset;
                if (!mimeType || !size) {
                    continue;
                }
                // TODO : Handle multiple files
                onChange({
                    name: name,
                    size: size,
                    type: mimeType,
                    uri,
                });
            }
        }
    };

    const selected = internalValue
        ? Array.isArray(internalValue)
            ? internalValue
            : [internalValue]
        : [];

    return (
        <View style={{ gap: 16 }}>
            <TouchableOpacity disabled={disabled} onPress={onPress}>
                <Text style={{ fontSize: 32 }}>{isImage ? '🖼️' : '📂'}</Text>
            </TouchableOpacity>

            {/* Image works also for PDFs (e.g. it creates a thumbnail) */}
            {/* TODO : Implement "X" control to reset the value */}

            {selected.map((f) => (
                <Image
                    key={f.uri}
                    source={{
                        height: 100,
                        uri: f.uri,
                        width: 100,
                    }}
                />
            ))}
        </View>
    );
}
