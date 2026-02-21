export function bindFactory(container, identifier) {
    container
        .bind(`Factory<${identifier}>`)
        .toFactory((context) => {
        return async (clazz) => {
            return context.get(clazz);
        };
    });
}
