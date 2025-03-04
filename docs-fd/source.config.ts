import { remarkMermaid } from '@theguild/remark-mermaid';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
    dir: 'content/docs',
});

export default defineConfig({
    mdxOptions: {
        remarkPlugins: [remarkMermaid],
    },
});
