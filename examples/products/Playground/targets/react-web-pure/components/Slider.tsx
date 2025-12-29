import {
    type ChangeEventHandler,
    type ReactElement,
    useEffect,
    useState,
} from 'react';

import {
    isBlank,
    ucifId,
    type Year,
} from '../../../../../../dist/esm/index.js';
import {
    styleDef,
    type UCFormFieldControlProps,
    useStyleContext,
} from '../../../../../../dist/esm/index.react.js';

export default function Slider({
    disabled,
    f,
    onChange: onChangeBase,
}: UCFormFieldControlProps<Year>): ReactElement | null {
    const { formFieldControl } = useStyleContext();

    const [internalValue, setInternalValue] = useState(f.getValue());

    // biome-ignore lint/correctness/useExhaustiveDependencies: It is actually necessary because only `f` or `f.getValue` does not trigger the effect
    useEffect(() => {
        setInternalValue(f.getValue());
    }, [f.getValue()]);

    const {
        def: { type },
        key,
    } = f;

    const options = type.getOptions();
    if (isBlank(options)) {
        return null;
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value as unknown as Year;
        f.setVal(value);
        setInternalValue(value);
        onChangeBase();
    };

    // biome-ignore lint/style/noNonNullAssertion: it's not blank
    const min = options[options.length - 1]!.value;
    // biome-ignore lint/style/noNonNullAssertion: it's not blank
    const max = options[0]!.value;

    const { className, style } = styleDef(formFieldControl, 'range');

    return (
        <span className={className} style={style}>
            <input
                disabled={disabled}
                id={ucifId(key)}
                max={max}
                min={min}
                onChange={onChange}
                type="range"
            />
            <span>{internalValue}</span>
        </span>
    );
}
