# Switch to a persistent data storage

By default, the data is stored in memory on the server. Therefore, whenever we restart it, we lose everything. That is not very practical in real life scenarios. Let's use SQLite instead.

```sh
yarn add "knex@^3.1.0" "sqlite3@^5.1.7"
```

Update `src/products/SuperTrader/server/container.ts` to change the implementation.

```diff
[...]
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
+    type UCDataStore,
[...]
+import {
+    KnexUCDataStore,
+    type KnexUCDataStoreSettings,
+} from 'libmodulor/uc-data-store-knex';
[...]
+type S = KnexUCDataStoreSettings & ServerManagerSettings;
[...]
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
+    knex_uc_data_store_conn_string: 'postgresql://toto',
+    knex_uc_data_store_file_path: 'uc-data-store.sqlite',
+    knex_uc_data_store_pool_max: 5,
+    knex_uc_data_store_pool_min: 0,
+    knex_uc_data_store_type: 'sqlite3',
    server_static_dir_path: 'public',
[...]
container.rebind<SettingsManager>('SettingsManager').to(EnvSettingsManager);
+container.rebind<UCDataStore>('UCDataStore').to(KnexUCDataStore);
```

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server.

```sh
yarn build && yarn run:server
```

Fill and submit the use case multiple times.

Open the SQLite database with your favorite DB editor (e.g. TablePlus, DBeaver...).

```sh
open dist/products/SuperTrader/server/uc-data-store.sqlite
```

You should see all your submissions stored in the database.

```sh
yarn lint && git add . && git commit -m "feat: persist data in SQLite"
```

Now that's done, let's [Define wording for humans](./009_Define_wording_for_humans.md).
