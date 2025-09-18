<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

### SearchAccomodation

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>adultsCount: UIntQuantity<br/>childrenCount: UIntQuantity<br/>country: CountryISO3166Alpha2<br/>from: DateISO8601<br/>roomsCount: UIntQuantity<br/>to: DateISO8601
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Everybody"
    break when any validation fails
        Client-->User: show failure
    end
    Client-->>-User: 👍 OK
```

## Technical Summary

|#|filePath|constName|metadataName|metadataAction|metadataBeta|metadataIcon|metadataNew|metadataSensitive|externalImports|internalImports|ioI|ioIFields|ioOPI0|ioOPI0Fields|ioOPI1|ioOPI1Fields|lifecycleClientPolicy|lifecycleServerPolicy|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|1|/src/ucds/SearchAccomodationUCD.ts|SearchAccomodationUCD|SearchAccomodation|Search||magnifying-glass|||inversify<br>libmodulor|../lib/AccomodationSearcher.js<br>../lib/TAccomodationRate.js<br>../manifest.js|SearchAccomodationInput|adultsCount: UCInputFieldValue&#60;UIntQuantity&#62;<br>childrenCount: UCInputFieldValue&#60;UIntQuantity&#62;<br>country: UCInputFieldValue&#60;CountryISO3166Alpha2&#62;<br>from: UCInputFieldValue&#60;DateISO8601&#62;<br>roomsCount: UCInputFieldValue&#60;UIntQuantity&#62;<br>to: UCInputFieldValue&#60;DateISO8601&#62;|SearchAccomodationOPI0|name: CompanyName<br>price: Amount<br>rate: AccomodationRate<br>title: FreeTextShort<br>id: UUID|||Everybody||
