import React, { type PropsWithChildren, type ReactElement } from 'react';

import ClientLayout from '../components/ClientLayout.js';

export default function RootLayout({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <html lang="en">
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
