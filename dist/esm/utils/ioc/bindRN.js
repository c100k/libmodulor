import { BufferLibBufferManager } from '../../std/impl/BufferLibBufferManager.js';
export function bindRN(container) {
    // std
    container.bind('BufferManager').to(BufferLibBufferManager);
}
