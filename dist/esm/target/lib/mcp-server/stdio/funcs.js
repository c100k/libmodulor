import { ERR_LOGGER_LEVEL } from './consts.js';
export function assertLoggerLevel(loggerLevel) {
    if (loggerLevel === 'error') {
        return;
    }
    // Depending on the `Logger` implementation, this.logger.error() might not write to stderr (e.g. can write to a file).
    // That's why we explicitly write to stdout by calling console.error().
    // biome-ignore lint/suspicious/noConsole: we want it
    console.error(new Error(ERR_LOGGER_LEVEL));
}
