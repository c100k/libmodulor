| # | Name | HTML Input Type | RN Input Mode | Example | Formatted |
| ------ | ------ | ------ | ------ | ------ | ------ |
| `0` | `Address` | `text` | `text` | `55 Rue du Faubourg Saint-Honoré, 75008 Paris` | `55 Rue du Faubourg Saint-Honoré, 75008 Paris` |
| `1` | `Amount` | `number` | `decimal` | `999.99` | `€999.99` |
| `2` | `BarCode` | `text` | `text` | `3046920029759` | `3046920029759` |
| `3` | `ColorRGBA` | `color` | `text` | `#000000ff` | `#000000ff` |
| `4` | `CountryISO3166Alpha2` | `text` | `text` | `FR` | `FR` |
| `5` | `CurrencyISO4217` | `text` | `text` | `EUR` | `EUR` |
| `6` | `CSS` | `text` | `text` | `body { font-size: 30px; }` | `body { font-size: 30px; }` |
| `7` | `DateISO8601` | `date` | `text` | `2022-07-14` | `7/14/2022` |
| `8` | `DomainName` | `url` | `url` | `myservice.toto.com` | `myservice.toto.com` |
| `9` | `Email` | `email` | `email` | `dexter@caramail.com` | `dexter@caramail.com` |
| `10` | `Emoji` | `text` | `text` | `🚀` | `🚀` |
| `11` | `File` | `file` | `text` | `{"name":"picture.png","path":"/Users/dexter/Desktop/picture.png","type":"image/png"}` | `{"name":"picture.png","path":"/Users/dexter/Desktop/picture.png","type":"image/png"}` |
| `12` | `FileExtension` | `text` | `text` | `png` | `png` |
| `13` | `FileMimeType` | `text` | `text` | `image/png` | `image/png` |
| `14` | `FilePath` | `text` | `text` | `/Users/dexter/Desktop/picture.png` | `/Users/dexter/Desktop/picture.png` |
| `15` | `Geolocation` | `text` | `text` | `{"lat":0,"lng":0}` | `{"lat":0,"lng":0}` |
| `16` | `GitSSHURL` | `text` | `text` | `git@github.com:nodejs/node.git` | `git@github.com:nodejs/node.git` |
| `17` | `HTTPContentType` | `text` | `text` | `application/json` | `application/json` |
| `18` | `HTTPMethod` | `text` | `text` | `GET` | `GET` |
| `19` | `HTTPStatusNumber` | `number` | `numeric` | `201` | `201` |
| `20` | `HostAddress` | `text` | `text` | `123.45.67.89` | `123.45.67.89` |
| `21` | `HostPort` | `number` | `numeric` | `443` | `443` |
| `22` | `IPv4` | `text` | `text` | `255.255.255.255` | `255.255.255.255` |
| `23` | `IPv6` | `text` | `text` | `2001:0db8:85a3:0000:0000:8a2e:0370:7334` | `2001:0db8:85a3:0000:0000:8a2e:0370:7334` |
| `24` | `JSONString` | `text` | `text` | `{"key": "value"}` | `{"key": "value"}` |
| `25` | `JWT` | `password` | `text` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` |
| `26` | `Percentage` | `number` | `decimal` | `0.26` | `26%` |
| `27` | `PersonFirstname` | `text` | `text` | `Dexter` | `Dexter` |
| `28` | `PersonFullname` | `text` | `text` | `Dexter Morgan` | `Dexter Morgan` |
| `29` | `PersonInitials` | `text` | `text` | `DM` | `DM` |
| `30` | `PersonLastname` | `text` | `text` | `Morgan` | `Morgan` |
| `31` | `QRCode` | `text` | `text` | `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAQvSURBVO3BMQ4bWQxEwecPXYGnZUAw4Gl5CK+DDToaYDCS1vZ21Y+fv2D2r4OZOJiJg5k4mImDmTiYiYOZOJiJg5k4mImDmTiYiYOZOJiJg5l48VBv8k0VwxO9yR0Vw5XeRFUMqjf5porhiYOZOJiJg5l48WYVwzv1Jnf0JndUDFd6k3eqGN6pN3mng5k4mImDmXjxYb3JHRXDHb3JlYpB9SZPVAyqN3miN7mjYvikg5k4mImDmXjxl6kYVG9ypTdRFYOqGK5UDH+Tg5k4mImDmXjxl6sYVG9ypTdRFcOV3kRVDH+yg5k4mImDmXjxYRXDN/Umd1QMqjdRvcknVQy/k4OZOJiJg5l48Wa9yX+pYlC9iaoYVG+iKgbVm6iKQfUmd/Qmv7ODmTiYiYOZ+PHzF/5gvckTFYPqTVTF8H9yMBMHM3EwEy8e6k1UxaB6k3eqGFTF8E4Vg+pNrlQMV3qTd6oYPulgJg5m4mAmXjxUMaje5ErF8ERvoioG1ZtcqRjuqBiu9CaqYlAVg+pNVMVwR2+iKoZ3OpiJg5k4mIkXX9abqIrhSm+iKgbVm3xTb6IqBtWbqIrhSm9ypWK40puoiuGJg5k4mImDmXjxZhWD6k1UxaB6kysVwzv1JlcqBtWbqIpB9SZPVAx3VAyqN3mng5k4mImDmXjxUG9ypWJQvckdvYmqGK5UDKo3URXDHRXDlYpB9SaqN1EVg+pNVMWgepNvOpiJg5k4mIkXb1YxqN5EVQyqN7lSMajeRFUMT/Qmd1QMVyqGK72JqhhUb6IqBtWbqIrhnQ5m4mAmDmbixYdVDE/0JqpiUL3JExWD6k2u9CZ3VAxXepMnehNVMTxxMBMHM3EwEy++rDdRFYPqTVTFoHoTVTFc6U2u9CZXKgbVm3xSxXClYlC9yTsdzMTBTBzMxIsP601UxaB6kyu9iaoYVG/yThWD6k2e6E2e6E1UxaAqhnc6mImDmTiYiR8/f+EP1pvcUTE80ZtcqRju6E2uVAzfdDATBzNxMBMvHupNvqliUBXDHb3JlYrhSsWgepMrvYmqGK5UDKo3uaNieOJgJg5m4mAmXrxZxfBOvcmV3kRVDHdUDFd6E1Ux3FEx3NGbqIrhmw5m4mAmDmbixYf1JndUDL+TikH1Jld6kycqBtWbqIpB9SaqYnjiYCYOZuJgJl785XoTVTGo3uSJikH1JlcqBtWbqN7kSm/ySQczcTATBzPx4i/Tm6iK4UrFoHqTKxWD6k1UxXBHxaB6kysVg+pN3ulgJg5m4mAmXnxYxfBJFcMTvcmVikH1Jld6k3eqGL7pYCYOZuJgJl68WW/yTb3JHRXDlYpB9SaqYrjSm6iKQfUmd/Qm33QwEwczcTATP37+gtm/DmbiYCYOZuJgJg5m4mAmDmbiYCYOZuJgJg5m4mAmDmbiYCYOZuIfrRmHZL9VL3gAAAAASUVORK5CYII=` | `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAQvSURBVO3BMQ4bWQxEwecPXYGnZUAw4Gl5CK+DDToaYDCS1vZ21Y+fv2D2r4OZOJiJg5k4mImDmTiYiYOZOJiJg5k4mImDmTiYiYOZOJiJg5l48VBv8k0VwxO9yR0Vw5XeRFUMqjf5porhiYOZOJiJg5l48WYVwzv1Jnf0JndUDFd6k3eqGN6pN3mng5k4mImDmXjxYb3JHRXDHb3JlYpB9SZPVAyqN3miN7mjYvikg5k4mImDmXjxl6kYVG9ypTdRFYOqGK5UDH+Tg5k4mImDmXjxl6sYVG9ypTdRFcOV3kRVDH+yg5k4mImDmXjxYRXDN/Umd1QMqjdRvcknVQy/k4OZOJiJg5l48Wa9yX+pYlC9iaoYVG+iKgbVm6iKQfUmd/Qmv7ODmTiYiYOZ+PHzF/5gvckTFYPqTVTF8H9yMBMHM3EwEy8e6k1UxaB6k3eqGFTF8E4Vg+pNrlQMV3qTd6oYPulgJg5m4mAmXjxUMaje5ErF8ERvoioG1ZtcqRjuqBiu9CaqYlAVg+pNVMVwR2+iKoZ3OpiJg5k4mIkXX9abqIrhSm+iKgbVm3xTb6IqBtWbqIrhSm9ypWK40puoiuGJg5k4mImDmXjxZhWD6k1UxaB6kysVwzv1JlcqBtWbqIpB9SZPVAx3VAyqN3mng5k4mImDmXjxUG9ypWJQvckdvYmqGK5UDKo3URXDHRXDlYpB9SaqN1EVg+pNVMWgepNvOpiJg5k4mIkXb1YxqN5EVQyqN7lSMajeRFUMT/Qmd1QMVyqGK72JqhhUb6IqBtWbqIrhnQ5m4mAmDmbixYdVDE/0JqpiUL3JExWD6k2u9CZ3VAxXepMnehNVMTxxMBMHM3EwEy++rDdRFYPqTVTFoHoTVTFc6U2u9CZXKgbVm3xSxXClYlC9yTsdzMTBTBzMxIsP601UxaB6kyu9iaoYVG/yThWD6k2e6E2e6E1UxaAqhnc6mImDmTiYiR8/f+EP1pvcUTE80ZtcqRju6E2uVAzfdDATBzNxMBMvHupNvqliUBXDHb3JlYrhSsWgepMrvYmqGK5UDKo3uaNieOJgJg5m4mAmXrxZxfBOvcmV3kRVDHdUDFd6E1Ux3FEx3NGbqIrhmw5m4mAmDmbixYf1JndUDL+TikH1Jld6kycqBtWbqIpB9SaqYnjiYCYOZuJgJl785XoTVTGo3uSJikH1JlcqBtWbqN7kSm/ySQczcTATBzPx4i/Tm6iK4UrFoHqTKxWD6k1UxXBHxaB6kysVg+pN3ulgJg5m4mAmXnxYxfBJFcMTvcmVikH1Jld6k3eqGL7pYCYOZuJgJl68WW/yTb3JHRXDlYpB9SaqYrjSm6iKQfUmd/Qm33QwEwczcTATP37+gtm/DmbiYCYOZuJgJg5m4mAmDmbiYCYOZuJgJg5m4mAmDmbiYCYOZuIfrRmHZL9VL3gAAAAASUVORK5CYII=` |
| `32` | `SemVerVersion` | `text` | `text` | `1.2.3` | `1.2.3` |
| `33` | `Slug` | `text` | `text` | `title-of-seo-friendly-article` | `title-of-seo-friendly-article` |
| `34` | `SSHPrivateKey` | `password` | `text` | `-----BEGIN RSA PRIVATE KEY-----\nfhdsjkdsFDSFDSfgjfkhdsjf\n-----END RSA PRIVATE KEY-----` | `-----BEGIN RSA PRIVATE KEY-----\nfhdsjkdsFDSFDSfgjfkhdsjf\n-----END RSA PRIVATE KEY-----` |
| `35` | `SSHPublicKey` | `text` | `text` | `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG1G1clVyaD6+RGzzPAbyHEiRZQ/+xkSXblmZIOHgY7E` | `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG1G1clVyaD6+RGzzPAbyHEiRZQ/+xkSXblmZIOHgY7E` |
| `36` | `ShellCommand` | `text` | `text` | `sudo systemctl restart nginx` | `sudo systemctl restart nginx` |
| `37` | `Time` | `time` | `numeric` | `10:00` | `10:00` |
| `38` | `URL` | `url` | `url` | `https://myservice.toto.com` | `https://myservice.toto.com` |
| `39` | `UUID` | `text` | `text` | `dd9670e7-1dd5-4155-85c2-335714799ff7` | `dd9670e7-1dd5-4155-85c2-335714799ff7` |
