import type { ReactElement } from 'react';

interface Props {
    message: string;
}

export function Hero({ message }: Props): ReactElement {
    return (
        <div className="hero bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <p className="py-6">{message}</p>
                </div>
            </div>
        </div>
    );
}
