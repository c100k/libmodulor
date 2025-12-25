import { PRODUCT_NAME_PLACEHOLDER } from '../../convention.js';
import { FakeClockManager } from '../../std/impl/FakeClockManager.js';
import { FakeFSManager } from '../../std/impl/FakeFSManager.js';
import { FakeHTTPAPICallExecutor } from '../../std/impl/FakeHTTPAPICallExecutor.js';
import { NodeDeterministicCryptoManager } from '../../std/impl/NodeDeterministicCryptoManager.js';
import { SimpleFormDataBuilder } from '../../std/impl/SimpleFormDataBuilder.js';
import { bindCommon } from '../../utils/ioc/bindCommon.js';
import { bindNodeCore } from '../../utils/ioc/bindNodeCore.js';
import { bindServer } from '../../utils/ioc/bindServer.js';
export class NodeAppTesterConfigurator {
    async authSettersConfig() {
        return undefined;
    }
    async bindImplementations(ctx) {
        const { container } = ctx;
        bindCommon(container);
        bindNodeCore(container);
        bindServer(container);
        (await container.rebind('ProductManifest')).toConstantValue({
            appReg: [{ name: ctx.appManifest.name }],
            name: PRODUCT_NAME_PLACEHOLDER,
        });
        (await container.rebind('ClockManager')).to(FakeClockManager);
        (await container.rebind('CryptoManager'))
            .to(NodeDeterministicCryptoManager)
            .inSingletonScope();
        (await container.rebind('FSManager'))
            .to(FakeFSManager)
            .inSingletonScope();
        (await container.rebind('FormDataBuilder')).to(SimpleFormDataBuilder);
        (await container.rebind('HTTPAPICallExecutor'))
            .to(FakeHTTPAPICallExecutor)
            .inSingletonScope();
    }
    async clearExecution(ctx) {
        const { container } = ctx;
        await container.get('CryptoManager').clear();
        await container.get('EmailManager').clear();
        await container.get('JobManager').clear();
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
    async updateSettings(ctx, settings) {
        const { container } = ctx;
        const current = container.get('Settings');
        (await container.rebind('Settings')).toConstantValue({
            ...current,
            ...settings,
        });
    }
}
