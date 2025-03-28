| # | Name | HTML Input Type | RN Input Mode | Example | Formatted |
| ------ | ------ | ------ | ------ | ------ | ------ |
| `0` | `Address` | `text` | `text` | `55 Rue du Faubourg Saint-Honoré, 75008 Paris` | `55 Rue du Faubourg Saint-Honoré, 75008 Paris` |
| `1` | `Amount` | `number` | `decimal` | `999.99` | `€999.99` |
| `2` | `ApiKey` | `password` | `text` | `pk_bxa2HCdsT7CKwVSdem8fjS8rW` | `pk_bxa2HCdsT7CKwVSdem8fjS8rW` |
| `3` | `BarCode` | `text` | `text` | `3046920029759` | `3046920029759` |
| `4` | `CSS` | `text` | `text` | `body { font-size: 30px; }` | `body { font-size: 30px; }` |
| `5` | `Color` | `color` | `text` | `#000000` | `#000000` |
| `6` | `ColorRGBA` | `color` | `text` | `#000000ff` | `#000000ff` |
| `7` | `CompanyName` | `text` | `text` | `Google` | `Google` |
| `8` | `CountryISO3166Alpha2` | `text` | `text` | `FR` | `FR` |
| `9` | `CurrencyISO4217` | `text` | `text` | `EUR` | `EUR` |
| `10` | `DateISO8601` | `date` | `text` | `2022-07-14` | `7/14/2022` |
| `11` | `DateTimeFormat` | `text` | `text` | `ccc LLL dd` | `ccc LLL dd` |
| `12` | `DirPath` | `text` | `text` | `/Users/dexter/Desktop` | `/Users/dexter/Desktop` |
| `13` | `DomainName` | `url` | `url` | `myservice.toto.com` | `myservice.toto.com` |
| `14` | `Email` | `email` | `email` | `dexter@caramail.com` | `dexter@caramail.com` |
| `15` | `EmbeddedObject` | `text` | `text` | `{}` | `{}` |
| `16` | `Emoji` | `text` | `text` | `🚀` | `🚀` |
| `17` | `EncryptionKey` | `password` | `text` | `39b65c8b58140bed54c8b9a170f378644f128744a9711ef268ce561a360eb2eee6dbd2fd1ce7a743167e0cff5d7ca13cbdd2bded2b72c58d30caed990c3e04b6` | `39b65c8b58140bed54c8b9a170f378644f128744a9711ef268ce561a360eb2eee6dbd2fd1ce7a743167e0cff5d7ca13cbdd2bded2b72c58d30caed990c3e04b6` |
| `18` | `ErrorMessage` | `text` | `text` | `You are not allowed to access this resource` | `You are not allowed to access this resource` |
| `19` | `ExternalServiceId` | `text` | `text` | `ZNHD34AQW4CV7` | `ZNHD34AQW4CV7` |
| `20` | `File` | `file` | `text` | `{"name":"picture.png","path":"/Users/dexter/Desktop/picture.png","type":"image/png"}` | `{"name":"picture.png","path":"/Users/dexter/Desktop/picture.png","type":"image/png"}` |
| `21` | `FileExtension` | `text` | `text` | `png` | `png` |
| `22` | `FileMimeType` | `text` | `text` | `image/png` | `image/png` |
| `23` | `FileName` | `text` | `text` | `picture.png` | `picture.png` |
| `24` | `FilePath` | `text` | `text` | `/Users/dexter/Desktop/picture.png` | `/Users/dexter/Desktop/picture.png` |
| `25` | `FreeTextLong` | `text` | `text` | `On est jeunes et ambitieux. Parfois vicieux. Faut qu'tu te dises que. Tu peux être le prince de la ville si tu veux (si tu veux). Où tu veux (où tu veux) quand tu veux (quand tu veux).` | `On est jeunes et ambitieux. Parfois vicieux. Faut qu'tu te dises que. Tu peux être le prince de la ville si tu veux (si tu veux). Où tu veux (où tu veux) quand tu veux (quand tu veux).` |
| `26` | `FreeTextShort` | `text` | `text` | `Papillon` | `Papillon` |
| `27` | `Geolocation` | `text` | `text` | `{"lat":0,"lng":0}` | `{"lat":0,"lng":0}` |
| `28` | `GitSSHURL` | `text` | `text` | `git@github.com:nodejs/node.git` | `git@github.com:nodejs/node.git` |
| `29` | `HTML` | `text` | `text` | `<p>This is a paragraph</p>` | `<p>This is a paragraph</p>` |
| `30` | `HTTPContentType` | `text` | `text` | `application/json` | `application/json` |
| `31` | `HTTPMethod` | `text` | `text` | `GET` | `GET` |
| `32` | `HTTPStatusNumber` | `number` | `numeric` | `201` | `201` |
| `33` | `HostAddress` | `text` | `text` | `123.45.67.89` | `123.45.67.89` |
| `34` | `HostPort` | `number` | `numeric` | `443` | `443` |
| `35` | `IPv4` | `text` | `text` | `255.255.255.255` | `255.255.255.255` |
| `36` | `IPv6` | `text` | `text` | `2001:0db8:85a3:0000:0000:8a2e:0370:7334` | `2001:0db8:85a3:0000:0000:8a2e:0370:7334` |
| `37` | `JSONString` | `text` | `text` | `{"key": "value"}` | `{"key": "value"}` |
| `38` | `JWT` | `password` | `text` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` |
| `39` | `JavaScript` | `text` | `text` | `(()=>{})();` | `(()=>{})();` |
| `40` | `JobTitle` | `text` | `text` | `Senior Software Engineer` | `Senior Software Engineer` |
| `41` | `Markdown` | `text` | `text` | `**Some important stuff**` | `**Some important stuff**` |
| `42` | `NumIndex` | `number` | `numeric` | `0` | `0` |
| `43` | `Password` | `password` | `text` | `fmUUNWXazWH4` | `fmUUNWXazWH4` |
| `44` | `Percentage` | `number` | `decimal` | `0.26` | `26%` |
| `45` | `PersonFirstname` | `text` | `text` | `Dexter` | `Dexter` |
| `46` | `PersonFullname` | `text` | `text` | `Dexter Morgan` | `Dexter Morgan` |
| `47` | `PersonInitials` | `text` | `text` | `DM` | `DM` |
| `48` | `PersonLastname` | `text` | `text` | `Morgan` | `Morgan` |
| `49` | `QRCode` | `text` | `text` | `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAQvSURBVO3BMQ4bWQxEwecPXYGnZUAw4Gl5CK+DDToaYDCS1vZ21Y+fv2D2r4OZOJiJg5k4mImDmTiYiYOZOJiJg5k4mImDmTiYiYOZOJiJg5l48VBv8k0VwxO9yR0Vw5XeRFUMqjf5porhiYOZOJiJg5l48WYVwzv1Jnf0JndUDFd6k3eqGN6pN3mng5k4mImDmXjxYb3JHRXDHb3JlYpB9SZPVAyqN3miN7mjYvikg5k4mImDmXjxl6kYVG9ypTdRFYOqGK5UDH+Tg5k4mImDmXjxl6sYVG9ypTdRFcOV3kRVDH+yg5k4mImDmXjxYRXDN/Umd1QMqjdRvcknVQy/k4OZOJiJg5l48Wa9yX+pYlC9iaoYVG+iKgbVm6iKQfUmd/Qmv7ODmTiYiYOZ+PHzF/5gvckTFYPqTVTF8H9yMBMHM3EwEy8e6k1UxaB6k3eqGFTF8E4Vg+pNrlQMV3qTd6oYPulgJg5m4mAmXjxUMaje5ErF8ERvoioG1ZtcqRjuqBiu9CaqYlAVg+pNVMVwR2+iKoZ3OpiJg5k4mIkXX9abqIrhSm+iKgbVm3xTb6IqBtWbqIrhSm9ypWK40puoiuGJg5k4mImDmXjxZhWD6k1UxaB6kysVwzv1JlcqBtWbqIpB9SZPVAx3VAyqN3mng5k4mImDmXjxUG9ypWJQvckdvYmqGK5UDKo3URXDHRXDlYpB9SaqN1EVg+pNVMWgepNvOpiJg5k4mIkXb1YxqN5EVQyqN7lSMajeRFUMT/Qmd1QMVyqGK72JqhhUb6IqBtWbqIrhnQ5m4mAmDmbixYdVDE/0JqpiUL3JExWD6k2u9CZ3VAxXepMnehNVMTxxMBMHM3EwEy++rDdRFYPqTVTFoHoTVTFc6U2u9CZXKgbVm3xSxXClYlC9yTsdzMTBTBzMxIsP601UxaB6kyu9iaoYVG/yThWD6k2e6E2e6E1UxaAqhnc6mImDmTiYiR8/f+EP1pvcUTE80ZtcqRju6E2uVAzfdDATBzNxMBMvHupNvqliUBXDHb3JlYrhSsWgepMrvYmqGK5UDKo3uaNieOJgJg5m4mAmXrxZxfBOvcmV3kRVDHdUDFd6E1Ux3FEx3NGbqIrhmw5m4mAmDmbixYf1JndUDL+TikH1Jld6kycqBtWbqIpB9SaqYnjiYCYOZuJgJl785XoTVTGo3uSJikH1JlcqBtWbqN7kSm/ySQczcTATBzPx4i/Tm6iK4UrFoHqTKxWD6k1UxXBHxaB6kysVg+pN3ulgJg5m4mAmXnxYxfBJFcMTvcmVikH1Jld6k3eqGL7pYCYOZuJgJl68WW/yTb3JHRXDlYpB9SaqYrjSm6iKQfUmd/Qm33QwEwczcTATP37+gtm/DmbiYCYOZuJgJg5m4mAmDmbiYCYOZuJgJg5m4mAmDmbiYCYOZuIfrRmHZL9VL3gAAAAASUVORK5CYII=` | `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAQvSURBVO3BMQ4bWQxEwecPXYGnZUAw4Gl5CK+DDToaYDCS1vZ21Y+fv2D2r4OZOJiJg5k4mImDmTiYiYOZOJiJg5k4mImDmTiYiYOZOJiJg5l48VBv8k0VwxO9yR0Vw5XeRFUMqjf5porhiYOZOJiJg5l48WYVwzv1Jnf0JndUDFd6k3eqGN6pN3mng5k4mImDmXjxYb3JHRXDHb3JlYpB9SZPVAyqN3miN7mjYvikg5k4mImDmXjxl6kYVG9ypTdRFYOqGK5UDH+Tg5k4mImDmXjxl6sYVG9ypTdRFcOV3kRVDH+yg5k4mImDmXjxYRXDN/Umd1QMqjdRvcknVQy/k4OZOJiJg5l48Wa9yX+pYlC9iaoYVG+iKgbVm6iKQfUmd/Qmv7ODmTiYiYOZ+PHzF/5gvckTFYPqTVTF8H9yMBMHM3EwEy8e6k1UxaB6k3eqGFTF8E4Vg+pNrlQMV3qTd6oYPulgJg5m4mAmXjxUMaje5ErF8ERvoioG1ZtcqRjuqBiu9CaqYlAVg+pNVMVwR2+iKoZ3OpiJg5k4mIkXX9abqIrhSm+iKgbVm3xTb6IqBtWbqIrhSm9ypWK40puoiuGJg5k4mImDmXjxZhWD6k1UxaB6kysVwzv1JlcqBtWbqIpB9SZPVAx3VAyqN3mng5k4mImDmXjxUG9ypWJQvckdvYmqGK5UDKo3URXDHRXDlYpB9SaqN1EVg+pNVMWgepNvOpiJg5k4mIkXb1YxqN5EVQyqN7lSMajeRFUMT/Qmd1QMVyqGK72JqhhUb6IqBtWbqIrhnQ5m4mAmDmbixYdVDE/0JqpiUL3JExWD6k2u9CZ3VAxXepMnehNVMTxxMBMHM3EwEy++rDdRFYPqTVTFoHoTVTFc6U2u9CZXKgbVm3xSxXClYlC9yTsdzMTBTBzMxIsP601UxaB6kyu9iaoYVG/yThWD6k2e6E2e6E1UxaAqhnc6mImDmTiYiR8/f+EP1pvcUTE80ZtcqRju6E2uVAzfdDATBzNxMBMvHupNvqliUBXDHb3JlYrhSsWgepMrvYmqGK5UDKo3uaNieOJgJg5m4mAmXrxZxfBOvcmV3kRVDHdUDFd6E1Ux3FEx3NGbqIrhmw5m4mAmDmbixYf1JndUDL+TikH1Jld6kycqBtWbqIpB9SaqYnjiYCYOZuJgJl785XoTVTGo3uSJikH1JlcqBtWbqN7kSm/ySQczcTATBzPx4i/Tm6iK4UrFoHqTKxWD6k1UxXBHxaB6kysVg+pN3ulgJg5m4mAmXnxYxfBJFcMTvcmVikH1Jld6k3eqGL7pYCYOZuJgJl68WW/yTb3JHRXDlYpB9SaqYrjSm6iKQfUmd/Qm33QwEwczcTATP37+gtm/DmbiYCYOZuJgJg5m4mAmDmbiYCYOZuJgJg5m4mAmDmbiYCYOZuIfrRmHZL9VL3gAAAAASUVORK5CYII=` |
| `50` | `SQLQuery` | `text` | `text` | `select id, name from users limit 10;` | `select id, name from users limit 10;` |
| `51` | `SSHPrivateKey` | `password` | `text` | `-----BEGIN RSA PRIVATE KEY-----\nfhdsjkdsFDSFDSfgjfkhdsjf\n-----END RSA PRIVATE KEY-----` | `-----BEGIN RSA PRIVATE KEY-----\nfhdsjkdsFDSFDSfgjfkhdsjf\n-----END RSA PRIVATE KEY-----` |
| `52` | `SSHPublicKey` | `text` | `text` | `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG1G1clVyaD6+RGzzPAbyHEiRZQ/+xkSXblmZIOHgY7E` | `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG1G1clVyaD6+RGzzPAbyHEiRZQ/+xkSXblmZIOHgY7E` |
| `53` | `SearchQuery` | `search` | `search` | `Nike Streakfly` | `Nike Streakfly` |
| `54` | `SemVerVersion` | `text` | `text` | `1.2.3` | `1.2.3` |
| `55` | `ShellCommand` | `text` | `text` | `sudo systemctl restart nginx` | `sudo systemctl restart nginx` |
| `56` | `Slug` | `text` | `text` | `title-of-seo-friendly-article` | `title-of-seo-friendly-article` |
| `57` | `Time` | `time` | `numeric` | `10:00` | `10:00` |
| `58` | `Timestamp` | `number` | `numeric` | `1628359209` | `1628359209` |
| `59` | `UIntDuration` | `number` | `numeric` | `3600` | `3,600` |
| `60` | `UIntQuantity` | `number` | `numeric` | `10` | `10` |
| `61` | `URL` | `url` | `url` | `https://myservice.toto.com` | `https://myservice.toto.com` |
| `62` | `URLPath` | `text` | `text` | `/posts/1` | `/posts/1` |
| `63` | `UUID` | `text` | `text` | `dd9670e7-1dd5-4155-85c2-335714799ff7` | `dd9670e7-1dd5-4155-85c2-335714799ff7` |
| `64` | `Username` | `text` | `text` | `dmorgan` | `dmorgan` |
| `65` | `Year` | `number` | `numeric` | `2025` | `2025` |
| `66` | `YesNo` | `text` | `text` | `Y` | `Y` |
