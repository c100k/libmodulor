set -e

time (
    pnpm test
    pnpm libmodulor GenerateAppsTests
    pnpm libmodulor TestApp --appName MyRunningMap &
    pnpm libmodulor TestApp --appName MyTrip &
    pnpm libmodulor TestApp --appName Toolbox &
    wait
)
