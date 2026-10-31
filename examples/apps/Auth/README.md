<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

### OAuthGetToken

- **Type** : `Client / Server`
- **Client Policy** : `Everybody`
- **Server Policy** : `Everybody`

#### Input (I)

|#|name|humanized|dataType|
|---|---|---|---|
|1|`client_id`|Client id|`UUID`|
|2|`client_secret`|Client secret|`ApiKey`|
|3|`code`|Code|`ApiKey`|
|4|`code_verifier`|Code verifier|`ApiKey`|
|5|`grant_type`|Grant type|`OAuthGrantType`|
|6|`redirect_uri`|Redirect uri|`URL`|

#### Output (O)

##### Part 0 (OPI0)

|#|name|humanized|dataType|
|---|---|---|---|
|1|`access_token`|Access token|`ApiKey`|
|2|`expires_in`|Expires in|`UIntDuration`|
|3|`refresh_token`|Refresh token|-|
|4|`token_type`|Token type|`OAuthTokenType`|
|5|`id`|Id|`UUID`|

##### Part 1 (OPI1)

None

#### Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    User->>+Client: ✏️ Fill<br/>client_id: UUID<br/>client_secret: ApiKey<br/>code: ApiKey<br/>code_verifier: ApiKey<br/>grant_type: OAuthGrantType<br/>redirect_uri: URL
    User->>Client: ↩️ Submit
    Client->>Client: 🔐 Check policy "Everybody"
    break when any validation fails
        Client-->User: show failure
    end
    Client->>+Server: 📤 Send<br/>client_id: UUID<br/>client_secret: ApiKey<br/>code: ApiKey<br/>code_verifier: ApiKey<br/>grant_type: OAuthGrantType<br/>redirect_uri: URL
    Server->>Server: 🔐 Check policy "Everybody"
    break when any validation fails
        Server-->User: show failure
    end
    Server-->>-Client: 👍 OK<br/>access_token: ApiKey<br/>expires_in: UIntDuration<br/>refresh_token: null<br/>token_type: OAuthTokenType<br/>id: UUID
    Client-->>-User: 👍 OK
```

### SignIn

- **Type** : `Client / Server`
- **Client Policy** : `Anonymous`
- **Server Policy** : `Anonymous`

#### Input (I)

|#|name|humanized|dataType|
|---|---|---|---|
|1|`role`|Role|`Role`|

#### Output (O)

##### Part 0 (OPI0)

|#|name|humanized|dataType|
|---|---|---|---|
|1|`jwt`|Jwt|`JWT`|
|2|`id`|Id|`UUID`|

##### Part 1 (OPI1)

None

#### Sequence Diagram

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

- **Type** : `Client / Server`
- **Client Policy** : `Authenticated`
- **Server Policy** : `Authenticated`

#### Input (I)

None

#### Output (O)

##### Part 0 (OPI0)

None

##### Part 1 (OPI1)

None

#### Sequence Diagram

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
|1|/src/ucds/OAuthGetTokenUCD.ts|OAuthGetTokenUCD|OAuthGetToken|Create||lock||||../../../../../dist/esm/index.js<br>../lib/TOAuthGrantType.js<br>../lib/TOAuthTokenType.js<br>../manifest.js<br>./OAuthGetTokenServerMain.js|OAuthGetTokenInput|client_id: UCInputFieldValue&#60;UUID&#62;<br>client_secret: UCInputFieldValue&#60;ApiKey&#62;<br>code: UCInputFieldValue&#60;ApiKey&#62;<br>code_verifier: UCInputFieldValue&#60;ApiKey&#62;<br>grant_type: UCInputFieldValue&#60;OAuthGrantType&#62;<br>redirect_uri: UCInputFieldValue&#60;URL&#62;|OAuthGetTokenOPI0|access_token: ApiKey<br>expires_in: UIntDuration<br>refresh_token: ApiKey \| null<br>token_type: OAuthTokenType<br>id: UUID|||Everybody|Everybody|
|2|/src/ucds/SignInUCD.ts|SignInUCD|SignIn|Create||right-to-bracket||||../../../../../dist/esm/index.js<br>../lib/TRole.js<br>../manifest.js<br>./SignInServerMain.js|SignInInput|role: UCInputFieldValue&#60;Role&#62;|SignInOPI0|jwt: JWT<br>id: UUID|||Anonymous|Anonymous|
|3|/src/ucds/SignOutUCD.ts|SignOutUCD|SignOut|Delete||circle-xmark||true||../../../../../dist/esm/index.js<br>../manifest.js|||||||Authenticated|Authenticated|
