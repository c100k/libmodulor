set -e

buildDir=dist-examples/examples
productPath=products/Playground

################################
# Product > Playground
################################

# cloudflare-edge-worker-hono-server
targetName=cloudflare-edge-worker-hono-server
echo "Deploying $targetName"
pnpm wrangler d1 execute fik-sdk-examples-playground-uc-data-store --cwd $buildDir/$productPath/$targetName --remote --file=./migrations/001_init.sql
pnpm wrangler deploy --cwd $buildDir/$productPath/$targetName
