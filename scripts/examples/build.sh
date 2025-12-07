set -e

# Build all
echo "Building all"
pnpm tsc --project tsconfig.build.examples.json

if [ -d "dist-examples/examples" ]; then
    buildDir=dist-examples/examples
else
    buildDir=dist-examples
fi

srcDir=examples

################################
# Product > Basic
################################
# noop

################################
# Product > Playground
################################
productPath=products/Playground

echo "Creating .env"
cat > $buildDir/$productPath/.env <<'EOF'
app_mai_api_key=
EOF

# Target > cli-node-core
# noop

# Target > cli-node-stricli
# noop

# Target > mcp-server
# noop

# Target > rn
targetName=rn
echo "Adapting $targetName"
rm -Rf $buildDir/$productPath/$targetName # let metro/babel handle it
cp -R $srcDir/$productPath/$targetName $buildDir/$productPath/
echo '{"name":"rn","type":"module"}' > $buildDir/$productPath/$targetName/package.json # required by expo

# Target > server-cloudflare-worker
targetName=server-cloudflare-worker
echo "Adapting $targetName"
rm -Rf $buildDir/$productPath/$targetName # let wrangler handle it
cp -R $srcDir/$productPath/$targetName $buildDir/$productPath/

# Target > server-nextjs
targetName=server-nextjs
echo "Adapting $targetName"
rm -Rf $buildDir/$productPath/$targetName # let next.js handle it
cp -R $srcDir/$productPath/$targetName $buildDir/$productPath/
cp $buildDir/$productPath/.env $buildDir/$productPath/$targetName/
echo '{"name":"server-nextjs","type":"module"}' > $buildDir/$productPath/$targetName/package.json # required by next to start in the appropriate folder

# Target > server-node-express
targetName=server-node-express
echo "Adapting $targetName"
cp $buildDir/$productPath/.env $buildDir/$productPath/$targetName/

# Target > server-node-hono
targetName=server-node-hono
echo "Adapting $targetName"
cp $buildDir/$productPath/.env $buildDir/$productPath/$targetName/

# Target > spa
targetName=spa
echo "Adapting $targetName"
pnpm vite -c $srcDir/$productPath/$targetName/vite.config.ts build

################################
# --help
################################

echo "[Basic]"
productPath=products/Basic
echo "(cd ${srcDir}/${productPath} && bun index.ts)"
echo "(cd ${buildDir}/${productPath} && node index.js)"
echo "\n"

echo "[Playground]"
productPath=products/Playground
echo "pnpm wrangler dev --cwd ${buildDir}/${productPath}/server-cloudflare-worker"
echo "(cd ${buildDir}/${productPath}/server-node-express && node --env-file .env index.js)"
echo "(cd ${buildDir}/${productPath}/server-node-hono && node --env-file .env index.js)"
echo "(cd ${buildDir}/${productPath}/server-nextjs && pnpm next dev)"
echo "(cd ${buildDir}/${productPath}/cli-node-core && node index.js)"
echo "pnpm expo start --android ${buildDir}/${productPath}/rn"
echo "pnpm expo start --ios ${buildDir}/${productPath}/rn"
