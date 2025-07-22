set -e

pnpm test
pnpm libmodulor GenerateAppsTests
pnpm libmodulor TestApp --appName MyRunningMap
pnpm libmodulor TestApp --appName Toolbox
