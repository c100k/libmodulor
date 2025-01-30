rm -rf dist

tsc --project tsconfig.build.json

# server
cp .env dist/products/SuperTrader/server/.env

# web
yarn vite -c src/products/SuperTrader/vite.config.web.ts build

# rn
rm -Rf dist/products/SuperTrader/rn # metro/babel transpiles the code
cp -R src/products/SuperTrader/rn dist/products/SuperTrader/
echo '{"name":"rn","type":"module"}' > dist/products/SuperTrader/rn/package.json
