import { CustomError } from '../../../error/index.js';
export function print(line) {
    // biome-ignore lint/suspicious/noConsole: we want it
    console.info(line);
}
export function printError(err) {
    let message = '';
    if (err instanceof Error) {
        message = err.message;
        if (!(err instanceof CustomError)) {
            // biome-ignore lint/suspicious/noConsole: we want it
            console.error(err);
        }
    }
    else if (typeof err === 'string') {
        message = err;
    }
    // biome-ignore lint/suspicious/noConsole: we want it
    console.error(message);
}
