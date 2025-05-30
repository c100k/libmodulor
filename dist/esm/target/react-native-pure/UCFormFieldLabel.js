import React, {} from 'react';
import { Text } from 'react-native';
import { ucifIsMandatory } from '../../uc/index.js';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldLabel({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldLabel } = useStyleContext();
    const { label } = wordingManager.ucif(f);
    const mandatory = ucifIsMandatory(f.def);
    return (React.createElement(Text, { style: formFieldLabel?.style },
        label,
        mandatory && ' *'));
}
