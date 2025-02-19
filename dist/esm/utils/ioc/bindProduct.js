export function bindProduct(container, productManifest, productI18n) {
    // Using rebind because these are already bound by default in {@link bindCommon}.
    // The goal is to make it easier to get started for a user.
    container.rebind('I18n').toConstantValue(productI18n);
    container
        .rebind('ProductManifest')
        .toConstantValue(productManifest);
}
