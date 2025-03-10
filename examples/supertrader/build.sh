# build all targets
yarn tsc --project tsconfig.build.json

# server specific
cp .env dist/products/SuperTrader/server/.env

# web specific
yarn vite -c src/products/SuperTrader/web/vite.config.ts build

# rn specific
rm -Rf dist/products/SuperTrader/rn # let metro/babel transpiles the code
cp -R src/products/SuperTrader/rn dist/products/SuperTrader/
echo '{"name":"rn","type":"module"}' > dist/products/SuperTrader/rn/package.json
