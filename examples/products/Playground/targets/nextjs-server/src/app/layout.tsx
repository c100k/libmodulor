'use client';

import type { PropsWithChildren, ReactElement } from 'react';

import ClientLayout from '../components/ClientLayout.js';

export default function RootLayout({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <html lang="en">
            <head>
                <title>Playground</title>

                <link href="/favicon.png" rel="icon" type="image/png" />

                <link
                    href="https://libmodulor.c100k.eu/styles/index.css"
                    rel="stylesheet"
                />

                <style global jsx>{`
                    h1, h2, h3, h4 { margin: 0 }
                `}</style>
            </head>
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
