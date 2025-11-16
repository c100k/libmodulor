import type { ReactElement } from 'react';

import { style } from '../style.js';

interface Props {
    size?: number;
}

export default function Loader({ size = 40 }: Props): ReactElement {
    const color = style.colors?.primary;

    return (
        <div
            aria-busy="true"
            role="presentation"
            style={{
                alignItems: 'center',
                display: 'inline-flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    animation: 'spin 1s linear infinite',
                    border: `${size / 10}px solid rgba(0,0,0,0.1)`,
                    borderRadius: '50%',
                    borderTop: `${size / 10}px solid ${color}`,
                    height: size,
                    width: size,
                }}
            />
            <style>{`
        @keyframes spin {
        to { transform: rotate(360deg); }
        }
        `}</style>
        </div>
    );
}
