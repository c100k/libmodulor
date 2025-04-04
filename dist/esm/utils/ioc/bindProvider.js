export function bindProvider(container, identifier) {
    container
        .bind(`Provider<${identifier}>`)
        .toProvider((context) => {
        return async (clazz) => {
            return context.get(clazz);
        };
    });
}
