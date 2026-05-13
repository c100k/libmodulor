export const ABORTED_RES = 'Aborted';
export const ERR_LOGGER_LEVEL = 'Set the logging_level to "error" as MCP does not want the server to log to stdout (see https://modelcontextprotocol.io/docs/tools/debugging#implementing-logging)';
export const RESERVED_KEY = '_reserved';
export const RESERVED_CONFIRMED_KEY = 'confirmed';
export const UC_CONFIRM_HINT = `(Hint: ask the user to confirm. If they do, set the property "${RESERVED_CONFIRMED_KEY}" in "${RESERVED_KEY}" to true in the input. Otherwise, set it to false)`;
