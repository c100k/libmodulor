import './global.css';
import { Banner } from 'fumadocs-ui/components/banner';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
    subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <Banner variant="rainbow">
                    libmodulor v0.14.0 is out 🚀 =&gt; Check it out on GitHub or
                    npm !
                </Banner>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
