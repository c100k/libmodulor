export function bindProduct(container, productManifest, productI18n) {
    // Using rebind because these are already bound by default in {@link bindCommon}.
    // The goal is to make it easier to get started for a user.
    container.rebindSync('I18n').toConstantValue(productI18n);
    container
        .rebindSync('ProductManifest')
        .toConstantValue(productManifest);
}
