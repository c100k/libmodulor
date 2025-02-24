# Style the web Target

Even though pure HTML is nice to work with, most users won't accept this kind of style. That's why we're going to setup [tailwindcss](https://tailwindcss.com) to give a better look to our web Target.

Let's follow the [official instructions](https://tailwindcss.com/docs/installation/using-vite) to setup tailwindcss with vite.

```sh
yarn add "tailwindcss@^4.0.8" "@tailwindcss/vite@^4.0.8" "daisyui@beta"
```

Update `examples/products/playground/web/vite.config.ts` to add the dedicated plugin.

```diff
+import tailwindcss from '@tailwindcss/vite';
import { StripUCDLifecycleServerPlugin } from 'libmodulor/vite';

-plugins: [StripUCDLifecycleServerPlugin],
+plugins: [StripUCDLifecycleServerPlugin, tailwindcss()],
```

```sh
cat src/products/SuperTrader/web/styles.css
```

Update `src/products/SuperTrader/web/styles.css` to add the styles.

```css
@import "tailwindcss";
@plugin "daisyui";
```

Update `src/products/SuperTrader/web/index.html` to reference the CSS file.

```diff
<meta content="width=device-width, initial-scale=1" name="viewport" />
+<link href="/styles.css" rel="stylesheet" />
```

```sh
yarn build && yarn run:server
open http://localhost:7443
```

For now, we're done. Let's review what we've built : [Summary](./030_Summary.md).
