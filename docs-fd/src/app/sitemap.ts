import type { MetadataRoute } from 'next';

import { source } from '@/lib/source';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = (path: string): string =>
        new URL(path, 'https://libmodulor.c100k.eu').toString();

    return [
        {
            url: url('/'),
        },
        ...(await Promise.all(
            source.getPages().map(async (page) => {
                const { lastModified } = page.data;
                return {
                    lastModified: lastModified
                        ? new Date(lastModified)
                        : undefined,
                    url: url(page.url),
                } as MetadataRoute.Sitemap[number];
            }),
        )),
    ];
}
