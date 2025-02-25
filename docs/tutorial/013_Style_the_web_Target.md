# Style the web Target

Even though pure HTML is nice to work with, most users won't accept this kind of style. That's why we're going to setup [tailwindcss](https://tailwindcss.com) and [daisyUI](https://daisyui.com) to give a better look to our web Target.

We'll see how we can use `libmodulor`'s primitives to render the UI we want to.

## Install

We're going to replicate the install instructions of [tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) and [daisyUI](https://v5.daisyui.com/docs/install).

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

Add the main CSS file that will reference both libraries.

```sh
touch src/products/SuperTrader/web/styles.css
```

```css
@import "tailwindcss";
@plugin "daisyui";
```

Update `src/products/SuperTrader/web/index.html` to reference the CSS file.

```diff
<meta content="width=device-width, initial-scale=1" name="viewport" />
+<link href="/styles.css" rel="stylesheet" />
```

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server if it's running.

```sh
yarn build && yarn run:server
open http://localhost:7443
```

We can see that we already have some style coming from these libraries. This tutorial is not about using `tailwindcss` and `daisyUI`, so feel free to follow their documentation to style as you like :

- [tailwindcss basics](https://tailwindcss.com/docs/styling-with-utility-classes)
- [tailwindcss components](https://tailwindui.com/components)
- [daisyUI basics](https://v5.daisyui.com/docs/use)

If you're feeling lazy, just replicate the basic changes made in [App.tsx](../../examples/libmodulor-tuto/src/products/SuperTrader/web/components/App.tsx).

## Customize the form

That being said, we can see that we have a problem styling the form. Indeed, in `<UCPanel />` we are using the basic `renderForm={UCForm}` which is [unstyled](../../dist/esm/target/react-web-pure/UCForm.js) by default.

Again, `libmodulor` does not make any assumptions on the technical side so you are free to use the styling library of your choice.

In our specific case, by looking at the documentation of [input field](https://v5.daisyui.com/components/input) and [button](https://v5.daisyui.com/components/button), we see that we need to add respectively the `input` and `btn` CSS classes.

Therefore, we need to provide our own implementation of `UCForm` and its children.

> [!NOTE]
> We are going to provide very simple implementations. In a real life scenario, you need to handle all the `data-types` used in your app. For instance, if you use `TPassword`, you need to define how to render it. The same goes with `TBoolean` and so on. If you have a `data-type` with options, you need to define how to render it as well (radio or select or anything else ?).

```sh
touch src/products/SuperTrader/web/components/{UCForm.tsx,UCFormField.tsx,UCFormFieldControl.tsx,UCFormFieldSubmitControl.tsx}
```

### UCForm.tsx

```tsx
import type { UCInput, UCOPIBase } from 'libmodulor';
import type { UCFormProps } from 'libmodulor/react';
import React, { type ReactElement, type FormEventHandler, useRef } from 'react';

import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';

export function UCForm<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({
    clearAfterExec,
    disabled,
    execState,
    onChange,
    onSubmit: onSubmitBase,
    uc,
}: UCFormProps<I, OPI0, OPI1>): ReactElement {
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const succeeded = await onSubmitBase();

        if (succeeded && clearAfterExec) {
            formRef.current?.reset();
        }
    };

    return (
        <form className="flex gap-2" onSubmit={onSubmit} ref={formRef}>
            {uc.inputFieldsForForm().map((f) => (
                <div key={f.key}>
                    <UCFormField
                        disabled={disabled}
                        execState={execState}
                        field={f}
                        onChange={onChange}
                    />
                </div>
            ))}

            <UCFormSubmitControl
                execState={execState}
                disabled={disabled}
                uc={uc}
            />
        </form>
    );
}
```

### UCFormField.tsx

```tsx
import { type DataType, ucifId } from 'libmodulor';
import { useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';
import {
    type Props as FormFieldControlProps,
    UCFormFieldControl,
} from './UCFormFieldControl.js';

export function UCFormField<T extends DataType>({
    disabled,
    execState,
    field,
    onChange,
}: FormFieldControlProps<T>): ReactElement {
    const { wordingManager } = useDIContext();

    const { label } = wordingManager.ucif(field);

    return (
        <label className="floating-label" htmlFor={ucifId(field.key)}>
            <span>{label}</span>
            <UCFormFieldControl
                disabled={disabled}
                execState={execState}
                field={field}
                onChange={onChange}
            />
        </label>
    );
}
```

### UCFormFieldControl.tsx

```tsx
import {
    type DataType,
    type ErrorMessage,
    type UCInputField,
    UCInputFieldChangeOperator,
} from 'libmodulor';
import type {
    UCFormFieldControlOnChange,
    UCPanelState,
} from 'libmodulor/react';
import { htmlInputDef } from 'libmodulor/web';
import React, { type ReactElement } from 'react';

export type Props<T extends DataType> = UCPanelState & {
    errMsg?: ErrorMessage | null;
    field: UCInputField<T>;
    onChange: UCFormFieldControlOnChange<T>;
};

export function UCFormFieldControl<T extends DataType>({
    errMsg = null,
    execState,
    field,
    onChange,
}: Props<T>): ReactElement {
    const attrs = htmlInputDef(field, execState, errMsg);

    if (attrs.internal?.multiline) {
        return (
            <textarea
                {...attrs.spec}
                className="textarea"
                onChange={(e) =>
                    onChange(
                        field,
                        UCInputFieldChangeOperator.SET,
                        e.currentTarget.value as T,
                    )
                }
            />
        );
    }

    return (
        <input
            {...attrs.spec}
            className="input"
            onChange={(e) =>
                onChange(
                    field,
                    UCInputFieldChangeOperator.SET,
                    e.currentTarget.value as T,
                )
            }
        />
    );
}
```

### UCFormSubmitControl.tsx

```tsx
import type { UCInput, UCOPIBase } from 'libmodulor';
import { type UCPanelCtx, useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';

type Props<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
> = UCPanelCtx<I, OPI0, OPI1>;

export function UCFormSubmitControl<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({ execState, disabled, uc }: Props<I, OPI0, OPI1>): ReactElement {
    const { wordingManager } = useDIContext();

    return (
        <button className="btn" disabled={disabled} type="submit">
            {execState === 'submitting' && (
                <span className="loading loading-spinner" />
            )}
            {wordingManager.ucISubmit(uc.def, execState)}
        </button>
    );
}
```

Press <kbd>ctrl</kbd> + <kbd>C</kbd> to stop the server if it's running.

```sh
yarn build && yarn run:server
open http://localhost:7443
```

Et voilà ! We have a beautiful UI thanks to these two UI libraries.

<img src="/docs/assets/trading-target-web-tailwindcss-daisyui.png" width="600px">

When you submit an order, you can see how the `execState` can easily be projected into the nice `loading loading-spinner` style provided by `daisyUI`.

The possibilities are endless.

```sh
yarn lint && yarn test && git add . && git commit -m "feat: style the web target"
```

You can go further if you want to. Here are some ideas :

- Use clickable default quantities (e.g. 100, 200, 300) instead of a number input field
- Display the form using a beautiful tailwindCSS UI component

For now, we're done. Let's review what we've built : [Summary](./030_Summary.md).
