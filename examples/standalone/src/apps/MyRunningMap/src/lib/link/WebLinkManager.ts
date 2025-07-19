import { injectable } from 'inversify';

import type {
    LinkManager,
    LinkManagerOpenable,
    LinkManagerOpenOpts,
} from './LinkManager.js';

@injectable()
export class WebLinkManager implements LinkManager {
    public async open(
        openable: LinkManagerOpenable,
        opts?: LinkManagerOpenOpts,
    ): Promise<void> {
        if (opts?.withinContext) {
            // Replace the current tab
            location.href = openable;
        } else {
            // Open in a new tab
            window.open(openable);
        }
    }
}
