import type { ReactElement } from 'react';
import { Text, View } from 'react-native';

import type {
    NumIndex,
    UCOPIBase,
    UCOutputReaderPart,
} from '../../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../../dist/esm/index.react.js';
import UCOutputFieldValue from './UCOutputFieldValue.jsx';

interface Props<OPI extends UCOPIBase> {
    fields: UCOutputReaderPart<OPI>['fields'];
    idx: NumIndex;
    item: OPI;
}

export default function UCOPICard<OPI extends UCOPIBase>({
    fields,
    idx,
    item,
}: Props<OPI>): ReactElement {
    const { wordingManager } = useDIContext();

    return (
        <View style={{ gap: 4 }}>
            <View
                key={'#'}
                style={{
                    flexDirection: 'row',
                    gap: 4,
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                    }}
                >
                    {'#'}
                </Text>
                <Text>{idx + 1}</Text>
            </View>
            {fields.map((f) => (
                <View
                    key={f.key}
                    style={{
                        flexDirection: 'row',
                        gap: 4,
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {wordingManager.ucof(f.key).label}
                    </Text>
                    <UCOutputFieldValue f={f} value={item[f.key]} />
                </View>
            ))}
        </View>
    );
}
