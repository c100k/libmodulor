### Define wording for humans

By default, the UI simply "humanizes" the use case field keys. It's fine for technical people, but not for humans.

Update `src/apps/Trading/src/i18n.ts` and add the following keys to `en`.

```typescript
uc_BuyAsset_label: 'Buy an asset',
uc_BuyAsset_i_submit_idle: 'Send buy order',
uc_BuyAsset_i_submit_submitting: 'Sending',
ucif_isin_label: 'ISIN',
ucif_qty_label: 'Quantity',
ucof_executedDirectly_label: '🚀 Executed directly',
ucof_id_label: 'Identifier',
validation_format_ISIN:
    'Must be 2 uppercase letters, followed by 9 alphanumeric characters and 1 digit',
```

Update `src/products/SuperTrader/i18n.ts` and add the following keys to `en`.

```typescript
total: 'Total',
```

> [!NOTE]
> We distinguish what's related to the app from what's related to the product. Usually, in the app's `i18n`, you'll add only translations following a certain convention like `dt_*` (data type choices), `err_*` (error messages), `uc_*` (use cases), `ucif_*` (use case input fields), `ucof_*` (use case output fields), `validation_*` (validation messages), etc.

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server.

```sh
yarn build && yarn run:server
```

Refresh the page. You should see a better wording. Try to type an invalid `ISIN` and see how the full validation message is displayed as well.

<img src="/docs/assets/trading-target-web-human.png" width="600px">

```sh
yarn lint && git add . && git commit -m "feat: define wording for humans"
```
