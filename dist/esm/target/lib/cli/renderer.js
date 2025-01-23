import { CustomError } from '../../../error/index.js';
export function print(line) {
    console.info(line);
}
export function printError(err) {
    let message = '';
    if (err instanceof Error) {
        message = err.message;
        if (!(err instanceof CustomError)) {
            console.error(err);
        }
    }
    else if (typeof err === 'string') {
        message = err;
    }
    console.error(message);
}
