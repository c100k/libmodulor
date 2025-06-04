import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    githubUrl: 'https://github.com/c100k/libmodulor',
    links: [
        {
            active: 'nested-url',
            text: 'Docs',
            url: '/docs',
        },
        {
            external: true,
            on: 'menu',
            text: 'llms.txt',
            url: '/llms.txt',
        },
        {
            external: true,
            on: 'menu',
            text: 'GitHub',
            url: 'https://github.com/c100k/libmodulor',
        },
    ],
    nav: {
        title: (
            <>
                <svg
                    aria-label="Logo"
                    height="24"
                    role="img"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx={12} cy={12} fill="currentColor" r={12} />
                </svg>
                libmodulor
            </>
        ),
    },
};
