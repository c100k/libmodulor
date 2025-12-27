export function fileImportName(name) {
    if (name.endsWith('.ts')) {
        return name.replaceAll('.ts', '.js');
    }
    return `${name}.js`;
}
export function successMessage(item) {
    return `${item} created successfully !`;
}
