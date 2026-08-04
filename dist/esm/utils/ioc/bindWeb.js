import { BufferLibBufferManager } from '../../std/impl/BufferLibBufferManager.js';
import { SimpleFileMetadataManager } from '../../std/impl/SimpleFileMetadataManager.js';
import { WebCryptoManager } from '../../std/impl/WebCryptoManager.js';
import { WebFSManager } from '../../std/impl/WebFSManager.js';
import { WebUCClientConfirmManager } from '../../uc/impl/WebUCClientConfirmManager.js';
export function bindWeb(container) {
    // std
    container.bind('BufferManager').to(BufferLibBufferManager);
    container.bind('CryptoManager').to(WebCryptoManager);
    container.bind('FSManager').to(WebFSManager);
    container
        .bind('FileMetadataManager')
        .to(SimpleFileMetadataManager);
    // uc
    container
        .rebindSync('UCClientConfirmManager')
        .to(WebUCClientConfirmManager);
}
