import { TString } from '../base/TString.js';
export class TQRCode extends TString {
    static FORMAT = /^data:image\/png;base64,.+$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: {
                f: 'QRCode',
                regexp: TQRCode.FORMAT,
            },
        });
    }
    tName() {
        return 'QRCode';
    }
    example() {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAQvSURBVO3BMQ4bWQxEwecPXYGnZUAw4Gl5CK+DDToaYDCS1vZ21Y+fv2D2r4OZOJiJg5k4mImDmTiYiYOZOJiJg5k4mImDmTiYiYOZOJiJg5l48VBv8k0VwxO9yR0Vw5XeRFUMqjf5porhiYOZOJiJg5l48WYVwzv1Jnf0JndUDFd6k3eqGN6pN3mng5k4mImDmXjxYb3JHRXDHb3JlYpB9SZPVAyqN3miN7mjYvikg5k4mImDmXjxl6kYVG9ypTdRFYOqGK5UDH+Tg5k4mImDmXjxl6sYVG9ypTdRFcOV3kRVDH+yg5k4mImDmXjxYRXDN/Umd1QMqjdRvcknVQy/k4OZOJiJg5l48Wa9yX+pYlC9iaoYVG+iKgbVm6iKQfUmd/Qmv7ODmTiYiYOZ+PHzF/5gvckTFYPqTVTF8H9yMBMHM3EwEy8e6k1UxaB6k3eqGFTF8E4Vg+pNrlQMV3qTd6oYPulgJg5m4mAmXjxUMaje5ErF8ERvoioG1ZtcqRjuqBiu9CaqYlAVg+pNVMVwR2+iKoZ3OpiJg5k4mIkXX9abqIrhSm+iKgbVm3xTb6IqBtWbqIrhSm9ypWK40puoiuGJg5k4mImDmXjxZhWD6k1UxaB6kysVwzv1JlcqBtWbqIpB9SZPVAx3VAyqN3mng5k4mImDmXjxUG9ypWJQvckdvYmqGK5UDKo3URXDHRXDlYpB9SaqN1EVg+pNVMWgepNvOpiJg5k4mIkXb1YxqN5EVQyqN7lSMajeRFUMT/Qmd1QMVyqGK72JqhhUb6IqBtWbqIrhnQ5m4mAmDmbixYdVDE/0JqpiUL3JExWD6k2u9CZ3VAxXepMnehNVMTxxMBMHM3EwEy++rDdRFYPqTVTFoHoTVTFc6U2u9CZXKgbVm3xSxXClYlC9yTsdzMTBTBzMxIsP601UxaB6kyu9iaoYVG/yThWD6k2e6E2e6E1UxaAqhnc6mImDmTiYiR8/f+EP1pvcUTE80ZtcqRju6E2uVAzfdDATBzNxMBMvHupNvqliUBXDHb3JlYrhSsWgepMrvYmqGK5UDKo3uaNieOJgJg5m4mAmXrxZxfBOvcmV3kRVDHdUDFd6E1Ux3FEx3NGbqIrhmw5m4mAmDmbixYf1JndUDL+TikH1Jld6kycqBtWbqIpB9SaqYnjiYCYOZuJgJl785XoTVTGo3uSJikH1JlcqBtWbqN7kSm/ySQczcTATBzPx4i/Tm6iK4UrFoHqTKxWD6k1UxXBHxaB6kysVg+pN3ulgJg5m4mAmXnxYxfBJFcMTvcmVikH1Jld6k3eqGL7pYCYOZuJgJl68WW/yTb3JHRXDlYpB9SaqYrjSm6iKQfUmd/Qm33QwEwczcTATP37+gtm/DmbiYCYOZuJgJg5m4mAmDmbiYCYOZuJgJg5m4mAmDmbiYCYOZuIfrRmHZL9VL3gAAAAASUVORK5CYII=';
    }
}
