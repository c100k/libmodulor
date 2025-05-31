productPath=products/SuperTrader

# Clean
# rm -rf dist

# Build all
pnpm tsc --project tsconfig.build.json

# Target specifics

# cli
# noop

# mcp-server
# noop

# rn
rm -Rf dist/$productPath/rn # let metro/babel transpile the code
cp -R src/$productPath/rn dist/$productPath/
echo '{"name":"rn","type":"module"}' > dist/$productPath/rn/package.json # required by expo

# server-nextjs
rm -Rf dist/$productPath/server-nextjs # let next.js transpile the code
cp -R src/$productPath/server-nextjs dist/$productPath/

# server-node-express
cp .env dist/$productPath/server-node-express/.env

# server-node-hono
cp .env dist/$productPath/server-node-hono/.env

# spa
pnpm vite -c src/$productPath/spa/vite.config.ts build
