export function fmtBold(s) {
    return `\x1b[1m${s}\x1b[0m`;
}
export function fmtCommand(cmd, details, padEnd) {
    return `  ${cmd.padEnd(padEnd)}${details ?? ''}`;
}
export function fmtPadEndFor(s) {
    const longest = s.sort((a, b) => a.length - b.length).reverse()[0];
    return (longest?.length ?? 1) + 10;
}
export function fmtSection(s) {
    return fmtBold(`\n[${s}]\n`);
}
