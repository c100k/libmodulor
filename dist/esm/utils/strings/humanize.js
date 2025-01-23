export function humanize(value) {
    let res = value.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res;
}
