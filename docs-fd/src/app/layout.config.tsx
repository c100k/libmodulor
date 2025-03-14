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
    nav: {
        title: (
            <>
                <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Logo"
                >
                    <circle cx={12} cy={12} r={12} fill="currentColor" />
                </svg>
                libmodulor
            </>
        ),
    },
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
};
