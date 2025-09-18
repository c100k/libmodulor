set -e

time (
    pnpm clean
    pnpm build
    pnpm run:node

    if command -v bun >/dev/null 2>&1; then
        pnpm run:bun
    fi
)
