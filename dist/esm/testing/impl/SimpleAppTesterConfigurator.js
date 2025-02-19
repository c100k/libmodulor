import { PRODUCT_NAME_PLACEHOLDER } from '../../convention.js';
export class SimpleAppTesterConfigurator {
    async authSettersConfig() {
        return undefined;
    }
    async bindImplementations(ctx) {
        const { container } = ctx;
        container.bind('ProductManifest').toConstantValue({
            appReg: [{ name: ctx.appManifest.name }],
            name: PRODUCT_NAME_PLACEHOLDER,
        });
    }
    async clearExecution(ctx) {
        const { container } = ctx;
        await container.get('UCDataStore').clear();
    }
    async flows() {
        return [];
    }
    async inputFillers() {
        return undefined;
    }
    async opts() {
        return undefined;
    }
    async seed(_ctx) {
        // Nothing to do
    }
    async sideEffects(_ctx) {
        return undefined;
    }
    async specificAssertions() {
        return undefined;
    }
}
