export function truncate(value, length, ellipsis = '...') {
    return value.length > length ? value.slice(0, length) + ellipsis : value;
}
