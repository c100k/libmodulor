import { remarkMermaid } from '@theguild/remark-mermaid';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export const docs = defineDocs({
    dir: 'content/docs',
});

export default defineConfig({
    lastModifiedTime: 'git',
    mdxOptions: {
        // Place it at first so that it won't be changed by syntax highlighter
        rehypePlugins: (v) => [rehypeKatex, ...v],
        remarkPlugins: [remarkMermaid, remarkMath],
    },
});
