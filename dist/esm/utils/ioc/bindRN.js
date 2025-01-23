import { BufferLibBufferManager } from '../../std/impl/BufferLibBufferManager.js';
export function bindRN(container) {
    container.bind('BufferManager').to(BufferLibBufferManager);
}
