import NativeSlider, { type SliderProps } from '@react-native-community/slider';
import { type ReactElement, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { isBlank, type Year } from '../../../../../dist/esm/index.js';
import {
    styleDef,
    type UCFormFieldControlProps,
    useStyleContext,
} from '../../../../../dist/esm/index.react.js';

export default function Slider({
    disabled,
    f,
    onChange: onChangeBase,
}: UCFormFieldControlProps<Year>): ReactElement | null {
    const { colors, formFieldControl } = useStyleContext();

    const [internalValue, setInternalValue] = useState(f.getValue());

    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive : It is actually necessary (only `f` does not trigger the effect)
    useEffect(() => {
        setInternalValue(f.getValue());
    }, [f.getValue()]);

    const {
        def: { type },
    } = f;

    const options = type.getOptions();
    if (isBlank(options)) {
        return null;
    }

    const onChange: SliderProps['onValueChange'] = (value) => {
        f.setVal(value);
        setInternalValue(value);
        onChangeBase();
    };

    // biome-ignore lint/style/noNonNullAssertion: it's not blank
    const min = options[options.length - 1]!.value;
    // biome-ignore lint/style/noNonNullAssertion: it's not blank
    const max = options[0]!.value;

    const { style } = styleDef(formFieldControl, 'range');
    const { style: containerStyle } = styleDef(
        formFieldControl,
        'rangeContainer',
    );

    return (
        <View style={containerStyle}>
            {/* @ts-ignore */}
            <NativeSlider
                disabled={disabled}
                maximumValue={max}
                minimumTrackTintColor={colors?.primary}
                minimumValue={min}
                onValueChange={onChange}
                step={1}
                style={style}
            />
            <Text>{internalValue}</Text>
        </View>
    );
}
