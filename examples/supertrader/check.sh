set -e

pnpm test
pnpm libmodulor GenerateAppsTests
pnpm libmodulor TestApp --appName Trading

touch .env
pnpm clean
pnpm build

pnpm run:cli
pnpm run:cli --version
