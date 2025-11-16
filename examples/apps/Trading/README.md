<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

### AskQuestion

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>prompt: FreeTextLong
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Authenticated"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>prompt: FreeTextLong
    Server->>Server: 🔐 Check policy "Authenticated"
    break when any validation fails
        Server-->User: show failure
    end
    Server-->>-Client: 👍 OK<br/>res: FreeTextLong<br/>id: UUID
    Client-->>-User: 👍 OK
```

### BuyAsset

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Authenticated"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity
    Server->>Server: 🔐 Check policy "Authenticated"
    break when any validation fails
        Server-->User: show failure
    end
    Server->>Server: Persist the order
    Server->>Server: TODO : Check the user has enough funds to place the order
    Server->>Server: TODO : Send the order to a queue for processing
    Server-->>-Client: 👍 OK<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity<br/>status: OrderStatus<br/>id: UUID
    Client-->>-User: 👍 OK
```

### CancelOrder

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>id: UUID
    User->>Client: ↩️ Submit
    Client->>User: ❓ Sure
    User->>Client: Yes
    break when does not confirm
        Client-->User: stop everything
    end
    Client->>Client: 🔐 Check policy "RoleAdmin"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>id: UUID
    Server->>Server: 🔐 Check policy "RoleAdmin"
    break when any validation fails
        Server-->User: show failure
    end
    Server->>Server: Check that the order exists
    Server->>Server: Cancel the order
    Server-->>-Client: 👍 OK<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity<br/>status: OrderStatus<br/>id: UUID
    Client-->>-User: 👍 OK
```

### ListOrders

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>id: UUID<br/>limit: UIntQuantity<br/>offset: NumIndex<br/>q: SearchQuery
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Everybody"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>id: UUID<br/>limit: UIntQuantity<br/>offset: NumIndex<br/>q: SearchQuery
    Server->>Server: 🔐 Check policy "Everybody"
    break when any validation fails
        Server-->User: show failure
    end
    Server-->>-Client: 👍 OK<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity<br/>status: OrderStatus<br/>id: UUID
    Client-->>-User: 👍 OK
```

### ViewAssetPrice

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>isin: ISIN
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Everybody"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>isin: ISIN
    Server->>Server: 🔐 Check policy "Everybody"
    break when any validation fails
        Server-->User: show failure
    end
    Server-->>-Client: 👍 OK<br/>evol: Amount<br/>price: Amount<br/>id: UUID
    Client-->>-User: 👍 OK
```

## Technical Summary

|#|filePath|constName|metadataName|metadataAction|metadataBeta|metadataIcon|metadataNew|metadataSensitive|externalImports|internalImports|ioI|ioIFields|ioOPI0|ioOPI0Fields|ioOPI1|ioOPI1Fields|lifecycleClientPolicy|lifecycleServerPolicy|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|1|/src/ucds/AskQuestionUCD.ts|AskQuestionUCD|AskQuestion|Search||list||||../../../../../dist/esm/index.js<br>../manifest.js<br>./AskQuestionServerMain.js|AskQuestionInput|prompt: UCInputFieldValue&#60;FreeTextLong&#62;|AskQuestionOPI0|res: FreeTextLong<br>id: UUID|||Authenticated|Authenticated|
|2|/src/ucds/BuyAssetUCD.ts|BuyAssetUCD|BuyAsset|Create||plus||||../../../../../dist/esm/index.js<br>../lib/order.js<br>../lib/TISIN.js<br>../manifest.js<br>./BuyAssetServerMain.js|BuyAssetInput|isin: UCInputFieldValue&#60;ISIN&#62;<br>limit: UCInputFieldValue&#60;Amount&#62;<br>qty: UCInputFieldValue&#60;UIntQuantity&#62;|BuyAssetOPI0|isin: ISIN<br>limit: Amount<br>qty: UIntQuantity<br>status: OrderStatus<br>id: UUID|||Authenticated|Authenticated|
|3|/src/ucds/CancelOrderUCD.ts|CancelOrderUCD|CancelOrder|Delete||circle-xmark||true||../../../../../dist/esm/index.js<br>../lib/order.js<br>../manifest.js<br>./CancelOrderServerMain.js|CancelOrderInput|id: UCInputFieldValue&#60;UUID&#62;|CancelOrderOPI0|isin: ISIN<br>limit: Amount<br>qty: UIntQuantity<br>status: OrderStatus<br>id: UUID|||RoleAdmin|RoleAdmin|
|4|/src/ucds/ListOrdersUCD.ts|ListOrdersUCD|ListOrders|List||list||||../../../../../dist/esm/index.js<br>../lib/order.js<br>../manifest.js<br>./ListOrdersServerMain.js|ListOrdersInput|id: UCInputFieldValue&#60;UUID&#62;<br>limit: UCInputFieldValue&#60;UIntQuantity&#62;<br>offset: UCInputFieldValue&#60;NumIndex&#62;<br>q: UCInputFieldValue&#60;SearchQuery&#62;|ListOrdersOPI0|isin: ISIN<br>limit: Amount<br>qty: UIntQuantity<br>status: OrderStatus<br>id: UUID|||Everybody|Everybody|
|5|/src/ucds/ViewAssetPriceUCD.ts|ViewAssetPriceUCD|ViewAssetPrice|View||money-bill-wave||||../../../../../dist/esm/index.js<br>../lib/TAssetPrice.js<br>../lib/TISIN.js<br>../manifest.js<br>./ViewAssetPriceServerMain.js|ViewAssetPriceInput|isin: UCInputFieldValue&#60;ISIN&#62;|ViewAssetPriceOPI0|evol: Amount<br>price: Amount<br>id: UUID|||Everybody|Everybody|
