import { EnvSettingsManager } from '../../std/impl/EnvSettingsManager.js';
import { NodeBufferManager } from '../../std/impl/NodeBufferManager.js';
import { NodeCryptoManager } from '../../std/impl/NodeCryptoManager.js';
import { NodeEnvironmentManager } from '../../std/impl/NodeEnvironmentManager.js';
import { NodeFormDataBuilder } from '../../std/impl/NodeFormDataBuilder.js';
import { NodeFSManager } from '../../std/impl/NodeFSManager.js';
export function bindNodeCore(container) {
    // std
    container.bind('BufferManager').to(NodeBufferManager);
    container.bind('CryptoManager').to(NodeCryptoManager);
    container
        .bind('EnvironmentManager')
        .to(NodeEnvironmentManager);
    container.bind('FSManager').to(NodeFSManager);
    container
        .rebindSync('FormDataBuilder')
        .to(NodeFormDataBuilder);
    container
        .rebindSync('SettingsManager')
        .to(EnvSettingsManager)
        .inSingletonScope();
}
