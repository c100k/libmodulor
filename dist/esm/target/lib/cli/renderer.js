import { CustomError } from '../../../error/index.js';
export function print(line) {
    // biome-ignore lint/suspicious/noConsole: we want it
    console.info(line);
}
export function printError(i18nManager, err) {
    if (typeof err === 'string') {
        // biome-ignore lint/suspicious/noConsole: we want it
        console.error(err);
        return;
    }
    if (!(err instanceof CustomError)) {
        // biome-ignore lint/suspicious/noConsole: we want it
        console.error(err);
        return;
    }
    // biome-ignore lint/suspicious/noConsole: we want it
    console.error(i18nManager.t(err.message));
}
