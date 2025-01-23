import { NodePromptManager } from '../../std/impl/NodePromptManager.js';
import { PromptUCClientConfirmManager } from '../../uc/impl/PromptUCClientConfirmManager.js';
export function bindNodeCLI(container) {
    container.bind('PromptManager').to(NodePromptManager);
    container
        .rebind('UCClientConfirmManager')
        .to(PromptUCClientConfirmManager);
}
