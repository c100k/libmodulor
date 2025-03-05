import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

import 'katex/dist/katex.css';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            sidebar={{ defaultOpenLevel: Number.POSITIVE_INFINITY }}
            tree={source.pageTree}
            {...baseOptions}
        >
            {children}
        </DocsLayout>
    );
}
