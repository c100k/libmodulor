// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
export const SSE_HEADERS = [
    ['Cache-Control', 'no-cache'],
    ['Content-Type', 'text/event-stream'],
    ['Connection', 'keep-alive'],
];
export const SSE_DATA_PREFIX = 'data:';
export const SSE_DATA_SEP = '\n';
export const SSE_MSG_SEP = '\n\n';
export function fmtSSEError(err) {
    return `${SSE_DATA_PREFIX} ${JSON.stringify(err)}${SSE_MSG_SEP}`;
}
export function fmtSingleDataMsg(data) {
    return `${SSE_DATA_PREFIX} ${JSON.stringify(data)}${SSE_MSG_SEP}`;
}
export function isSSEError(err) {
    return 'message' in err && 'status' in err;
}
export function parseDataLine(line) {
    if (!line.startsWith(SSE_DATA_PREFIX)) {
        return '';
    }
    return `${line.slice(SSE_DATA_PREFIX.length).trim()}${SSE_DATA_SEP}`;
}
