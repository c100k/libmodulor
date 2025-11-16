<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

### SignIn

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>role: Role
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Anonymous"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>role: Role
    Server->>Server: 🔐 Check policy "Anonymous"
    break when any validation fails
        Server-->User: show failure
    end
    Server->>Server: Compute the JWT
    Server-->>-Client: 👍 OK<br/>jwt: JWT<br/>id: UUID
    Client-->>-User: 👍 OK
```

### SignOut

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ⤴️ Trigger
    User->>Client: ↩️ Submit
    Client->>User: ❓ Sure
    User->>Client: Yes
    break when does not confirm
        Client-->User: stop everything
    end
    Client->>Client: 🔐 Check policy "Authenticated"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send
    Server->>Server: 🔐 Check policy "Authenticated"
    break when any validation fails
        Server-->User: show failure
    end
    Server-->>-Client: 👍 OK
    Client-->>-User: 👍 OK
```

## Technical Summary

|#|filePath|constName|metadataName|metadataAction|metadataBeta|metadataIcon|metadataNew|metadataSensitive|externalImports|internalImports|ioI|ioIFields|ioOPI0|ioOPI0Fields|ioOPI1|ioOPI1Fields|lifecycleClientPolicy|lifecycleServerPolicy|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|1|/src/ucds/SignInUCD.ts|SignInUCD|SignIn|Create||right-to-bracket||||../../../../../dist/esm/index.js<br>../lib/TRole.js<br>../manifest.js<br>./SignInServerMain.js|SignInInput|role: UCInputFieldValue&#60;Role&#62;|SignInOPI0|jwt: JWT<br>id: UUID|||Anonymous|Anonymous|
|2|/src/ucds/SignOutUCD.ts|SignOutUCD|SignOut|Delete||circle-xmark||true||../../../../../dist/esm/index.js<br>../manifest.js|||||||Authenticated|Authenticated|
