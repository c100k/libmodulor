<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

### BuyAsset

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Everybody"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity
    Server->>Server: 🔐 Check policy "Everybody"
    break when any validation fails
        Server-->User: show failure
    end
    Server->>Server: Persist the order
    Server->>Server: TODO : Check the user has enough funds to place the order
    Server->>Server: TODO : Send the order to a queue for processing
    Server-->>-Client: 👍 OK<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity<br/>id: UUID
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
    Server-->>-Client: 👍 OK<br/>isin: ISIN<br/>limit: Amount<br/>qty: UIntQuantity<br/>id: UUID
    Client-->>-User: 👍 OK
```

## Technical Summary

|#|filePath|constName|metadataName|metadataAction|metadataBeta|metadataIcon|metadataNew|metadataSensitive|externalImports|internalImports|ioI|ioIFields|ioOPI0|ioOPI0Fields|ioOPI1|ioOPI1Fields|lifecycleClientPolicy|lifecycleServerPolicy|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|1|/src/ucds/BuyAssetUCD.ts|BuyAssetUCD|BuyAsset|Create||plus|||libmodulor|../manifest.js<br>../lib/TISIN.js<br>../lib/order.js<br>./BuyAssetServerMain.js|BuyAssetInput|isin: UCInputFieldValue&#60;ISIN&#62;<br>limit: UCInputFieldValue&#60;Amount&#62;<br>qty: UCInputFieldValue&#60;UIntQuantity&#62;|BuyAssetOPI0|isin: ISIN<br>limit: Amount<br>qty: UIntQuantity<br>id: UUID|||Everybody|Everybody|
|2|/src/ucds/ListOrdersUCD.ts|ListOrdersUCD|ListOrders|List||list|||libmodulor|../lib/order.js<br>../manifest.js<br>./ListOrdersServerMain.js|ListOrdersInput|id: UCInputFieldValue&#60;UUID&#62;<br>limit: UCInputFieldValue&#60;UIntQuantity&#62;<br>offset: UCInputFieldValue&#60;NumIndex&#62;<br>q: UCInputFieldValue&#60;SearchQuery&#62;|ListOrdersOPI0|isin: ISIN<br>limit: Amount<br>qty: UIntQuantity<br>id: UUID|||Everybody|Everybody|
