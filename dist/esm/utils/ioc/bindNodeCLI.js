import { NodePromptManager } from '../../std/impl/NodePromptManager.js';
import { PromptUCClientConfirmManager } from '../../uc/impl/PromptUCClientConfirmManager.js';
export function bindNodeCLI(container) {
    // std
    container.bind('PromptManager').to(NodePromptManager);
    // uc
    container
        .rebindSync('UCClientConfirmManager')
        .to(PromptUCClientConfirmManager);
}
