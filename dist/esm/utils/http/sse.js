// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
export const SSE_HEADERS = [
    ['Cache-Control', 'no-cache'],
    ['Content-Type', 'text/event-stream'],
    ['Connection', 'keep-alive'],
];
export const SSE_DATA_PREFIX = 'data:';
export const SSE_DATA_SEP = '\n';
export const SSE_MSG_SEP = '\n\n';
export function streamOPI(part, onData, onDone, intervalInMS = 500) {
    const { items, total } = part;
    if (total === 0) {
        return null;
    }
    let idx = 0;
    const partial = {
        parts: {
            _0: {
                ...part,
                items: [],
            },
            // TODO : Handle _1 as well
        },
    };
    const intervalID = setInterval(() => {
        const item = items[idx];
        if (!item) {
            if (idx === 0) {
                onData(fmtSingleDataMsg(partial));
            }
            onDone();
            return;
        }
        partial.parts._0.items[0] = item;
        onData(fmtSingleDataMsg(partial));
        idx += 1;
    }, intervalInMS);
    return () => clearInterval(intervalID);
}
export function fmtSingleDataMsg(data) {
    return `${SSE_DATA_PREFIX} ${JSON.stringify(data)}${SSE_MSG_SEP}`;
}
export function parseDataLine(line) {
    if (!line.startsWith(SSE_DATA_PREFIX)) {
        return '';
    }
    return `${line.slice(SSE_DATA_PREFIX.length).trim()}${SSE_DATA_SEP}`;
}
