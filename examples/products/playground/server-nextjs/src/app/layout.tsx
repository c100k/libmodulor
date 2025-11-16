import type { PropsWithChildren, ReactElement } from 'react';

import ClientLayout from '../components/ClientLayout.js';

export default function RootLayout({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <html lang="en">
            <head>
                <title>Playground</title>
            </head>
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
