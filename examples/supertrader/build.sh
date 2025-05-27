set -e

buildDir=dist
srcDir=src
productPath=products/SuperTrader

# Clean
# rm -rf dist

# Build all
pnpm tsgo --project tsconfig.build.json

# Target specifics

# cli
# noop

# mcp-server
# noop

# rn
targetName=rn
echo "Adapting $targetName"
rm -Rf $buildDir/$productPath/$targetName # let metro/babel handle it
cp -R $srcDir/$productPath/$targetName $buildDir/$productPath/
echo '{"name":"rn","type":"module"}' > $buildDir/$productPath/$targetName/package.json # required by expo

# server-cloudflare-worker
targetName=server-cloudflare-worker
echo "Adapting $targetName"
rm -Rf $buildDir/$productPath/$targetName # let wrangler handle it
cp -R $srcDir/$productPath/$targetName $buildDir/$productPath/

# server-nextjs
targetName=server-nextjs
echo "Adapting $targetName"
rm -Rf $buildDir/$productPath/$targetName # let next.js handle it
cp -R $srcDir/$productPath/$targetName $buildDir/$productPath/
cp .env $buildDir/$productPath/$targetName/
echo '{"name":"server-nextjs","type":"module"}' > $buildDir/$productPath/$targetName/package.json # required by next to start in the appropriate folder

# server-node-express
targetName=server-node-express
echo "Adapting $targetName"
cp .env $buildDir/$productPath/$targetName/

# server-node-hono
targetName=server-node-hono
echo "Adapting $targetName"
cp .env $buildDir/$productPath/$targetName/

# spa
targetName=spa
echo "Adapting $targetName"
pnpm vite -c $srcDir/$productPath/$targetName/vite.config.ts build
