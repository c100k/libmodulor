import { injectable } from 'inversify';

import { sleep } from '../../../../../../dist/esm/index.js';
import type {
    LinkManager,
    LinkManagerOpenable,
    LinkManagerOpenOpts,
} from './LinkManager.js';

@injectable()
export class FakeLinkManager implements LinkManager {
    public history: [LinkManagerOpenable, LinkManagerOpenOpts | undefined][] =
        [];

    public async open(
        openable: LinkManagerOpenable,
        opts?: LinkManagerOpenOpts,
    ): Promise<void> {
        this.history.push([openable, opts]);
        await sleep(300);
        opts?.onClose?.(openable);
    }
}
