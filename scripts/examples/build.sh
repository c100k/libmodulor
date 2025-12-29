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
targetsPath=${productPath}/targets

echo "Creating .env"
cat > $buildDir/$productPath/.env <<'EOF'
app_mai_api_key=
app_server_basic_auth_entries='{"toto":"mdhg6gXJXI6vciD7egak"}'
app_server_public_api_key_entries='["lMNYGQlK98NB6it80wA5", "UNSAFE_CHANGE_ME"]'
EOF

# Target > cloudflare-edge-worker-hono-server
targetName=cloudflare-edge-worker-hono-server
echo "Adapting $targetName"
rm -Rf $buildDir/$targetsPath/$targetName # let wrangler handle it
cp -R $srcDir/$targetsPath/$targetName $buildDir/$targetsPath/

# Target > nextjs-server
targetName=nextjs-server
echo "Adapting $targetName"
rm -Rf $buildDir/$targetsPath/$targetName # let next.js handle it
cp -R $srcDir/$targetsPath/$targetName $buildDir/$targetsPath/
cp $buildDir/$productPath/.env $buildDir/$targetsPath/$targetName/
echo '{"name":"nextjs-server","type":"module"}' > $buildDir/$targetsPath/$targetName/package.json # required by next to start in the appropriate folder

# Target > node-core-cli
# noop

# Target > node-express-server
targetName=node-express-server
echo "Adapting $targetName"
cp $buildDir/$productPath/.env $buildDir/$targetsPath/$targetName/

# Target > node-hono-server
targetName=node-hono-server
echo "Adapting $targetName"
cp $buildDir/$productPath/.env $buildDir/$targetsPath/$targetName/

# Target > node-mcp-server
# noop

# Target > node-stricli-cli
# noop

# Target > react-native-pure-expo
targetName=react-native-pure-expo
echo "Adapting $targetName"
rm -Rf $buildDir/$targetsPath/$targetName # let metro/babel handle it
cp -R $srcDir/$targetsPath/$targetName $buildDir/$targetsPath/
echo '{"name":"react-native-pure-expo","type":"module"}' > $buildDir/$targetsPath/$targetName/package.json # required by expo

# Target > react-web-pure
targetName=react-web-pure
echo "Adapting $targetName"
pnpm vite -c $srcDir/$targetsPath/$targetName/vite.config.ts build

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
targetsPath=${productPath}/targets
echo "pnpm wrangler dev --cwd ${buildDir}/${targetsPath}/cloudflare-edge-worker-hono-server"
echo "(cd ${buildDir}/${targetsPath}/nextjs-server && pnpm next dev)"
echo "(cd ${buildDir}/${targetsPath}/node-core-cli && node index.js)"
echo "(cd ${buildDir}/${targetsPath}/node-express-server && node --env-file .env index.js)"
echo "(cd ${buildDir}/${targetsPath}/node-hono-server && node --env-file .env index.js)"
echo "nano ~/Library/Application\ Support/Claude/claude_desktop_config.json"
echo "{
    "mcpServers": {
        "Playground": {
            "command": "node",
            "args": [
                "/ABS_PATH_TO/examples/products/Playground/targets/node-mcp-server/index.js"
            ]
        }
    }
}"
echo "(cd ${buildDir}/${targetsPath}/node-stricli-cli && node index.js)"
echo "pnpm expo start --android ${buildDir}/${targetsPath}/react-native-pure-expo"
echo "pnpm expo start --ios ${buildDir}/${targetsPath}/react-native-pure-expo"
