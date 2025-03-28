import { readFile } from 'node:fs/promises';

import fg from 'fast-glob';
import { remarkInclude } from 'fumadocs-mdx/config';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';

export const revalidate = false;

export async function GET() {
    const files = await fg(['./content/docs/**/*.mdx']);

    // Temporarily exclude data-types as <include> is not handled correctly
    const scan = files
        .filter((f) => !f.endsWith('references/data-types.mdx'))
        .map(async (file) => {
            const fileContent = await readFile(file);
            const { content, data } = matter(fileContent.toString());

            const processed = await processContent(content);
            return `file: ${file}
meta: ${JSON.stringify(data, null, 2)}
        
${processed}`;
        });

    const scanned = await Promise.all(scan);

    return new Response(scanned.join('\n\n'));
}

async function processContent(content: string): Promise<string> {
    const file = await remark()
        .use(remarkMdx)
        .use(remarkInclude) // https://fumadocs.vercel.app/docs/mdx/include
        .use(remarkGfm) // gfm styles
        .use(remarkStringify)
        .process(content);

    return String(file);
}
