export function bindProduct(container, productManifest, productI18n) {
    container.rebind('I18n').toConstantValue(productI18n);
    container
        .rebind('ProductManifest')
        .toConstantValue(productManifest);
}
