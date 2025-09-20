set -e

time (
    # Enable only locally to debug
    OPEN_APP_TESTS_REPORTS=false
    # Enable only locally to debug
    INTERACTIVE=true

    cwd=$(pwd)

    pnpm test
    pnpm libmodulor GenerateAppsTests
    appsPath=src/apps
    for appPath in $appsPath/* ; do
        appName=$(basename "$appPath")
        pnpm libmodulor TestApp --appName $appName
        if [ "$OPEN_APP_TESTS_REPORTS" = "true" ]; then
            open $appPath/test/reports/coverage/index.html
            open $appPath/test/reports/simple-html/index.html
        fi
    done

    pnpm clean
    touch .env
    pnpm build

    # Ordered by speed of startup
    for server in node-express node-hono nextjs cloudflare-worker
    do
        serverPath=$cwd/dist/products/SuperTrader/server-$server
        cd $serverPath

        # Starting the server
        rm -rf nohup.out server.pid
        if [ "$server" = "cloudflare-worker" ]; then
            nohup pnpm wrangler dev --cwd $(pwd) & echo $! > server.pid
            port=8787
        elif [ "$server" = "nextjs" ]; then
            nohup pnpm next dev & echo $! > server.pid
            port=3000
        else
            nohup node --env-file .env index.js & echo $! > server.pid
            port=7443
        fi
        echo "🚀 Server PID = $(cat server.pid)"
        sleep 3

        host=http://localhost:$port

        cd $cwd

        # Testing curl
        headApiKey="X-API-Key: PublicApiKeyToBeChangedWhenDeploying"
        headContentType="Content-Type: application/json"
        curl $host/api/v1/Trading_BuyAsset -X POST -H "$headContentType" | jq
        curl $host/api/v1/Trading_BuyAsset -X POST -H "$headContentType" -H "$headApiKey" | jq
        curl $host/api/v1/Trading_BuyAsset -X POST -H "$headContentType" -H "$headApiKey" -d '{"isin":"US4345455444","limit":150,"qty":100}' | jq
        curl $host/api/v1/Trading_CancelOrder -X DELETE -H "$headContentType" -H "$headApiKey" -d '{"id":"db5cb3f9-464b-4ba6-84f8-ab792615271b"}' | jq
        curl $host/api/v1/Trading_ListOrders -H "$headContentType" -H "$headApiKey" | jq

        # Testing cli
        cd $cwd/dist/products/SuperTrader/cli
        echo "app_server_public_url=$host" > .env
        node --env-file .env index.js
        node --env-file .env index.js --help
        node --env-file .env index.js --version
        node --env-file .env index.js Trading_BuyAsset
        node --env-file .env index.js Trading_BuyAsset --isin US4345455444 --limit 150 --qty 100
        if [ "$INTERACTIVE" = "true" ]; then
            node --env-file .env index.js Trading_CancelOrder --id db5cb3f9-464b-4ba6-84f8-ab792615271b
        fi
        node --env-file .env index.js Trading_ListOrders

        # Testing spa
        if [ "$INTERACTIVE" = "true" ]; then
            open $host
            echo "Check the opened web page, making sure there are no errors in the dev console"
            read -p "Press Enter to continue..."
        fi

        # Testing Claude
        echo "Skipping as not implemented yet"

        # Testing rn android
        echo "Skipping as not implemented yet"

        # Testing rn ios
        echo "Skipping as not implemented yet"

        # Cleaning
        kill $(cat $serverPath/server.pid)
        sleep 1
        if [ "$server" = "cloudflare-worker" ]; then
            ps ax | grep "wrangler"
        elif [ "$server" = "nextjs" ]; then
            # server.pid contains the PID of the pnpm process (or nohup ?).
            # At startup, a bunch of "next" processes are created.
            # But killing the PID in server.pid does not kill them.
            # So we kill the main one manually.
            pkill next-server
            ps ax | grep "next"
        else
            ps ax | grep "env-file"
        fi
        curl $host || true
    done
)
