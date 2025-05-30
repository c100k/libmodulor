import { BufferLibBufferManager } from '../../std/impl/BufferLibBufferManager.js';
import { RNUCClientConfirmManager } from '../../uc/impl/RNUCClientConfirmManager.js';
export function bindRN(container) {
    // std
    container.bind('BufferManager').to(BufferLibBufferManager);
    // uc
    container
        .rebindSync('UCClientConfirmManager')
        .to(RNUCClientConfirmManager);
}
