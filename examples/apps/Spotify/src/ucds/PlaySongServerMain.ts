import { inject, injectable } from 'inversify';

import {
    type Logger,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import { SongPlayer } from '../lib/SongPlayer.js';
import type { PlaySongInput, PlaySongOPI0 } from './PlaySongUCD.js';

@injectable()
export class PlaySongServerMain implements UCMain<PlaySongInput, PlaySongOPI0> {
    constructor(
        @inject('Logger') private logger: Logger,
        @inject(SongPlayer) private songPlayer: SongPlayer,
    ) {}

    public async exec({
        opts,
        uc,
    }: UCMainInput<PlaySongInput, PlaySongOPI0>): Promise<
        UCOutput<PlaySongOPI0>
    > {
        const id = uc.reqVal0('id');

        const ob = new UCOutputBuilder<PlaySongOPI0>().add({
            duration: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            id,
        });

        if (opts?.stream) {
            opts.stream.onClose = async () => {
                this.logger.debug('Stopping playing the song');
                stop();
            };
        }
        const { stop } = await this.songPlayer.exec({
            durationInS: 11,
            onDone: () => {
                opts?.stream?.onDone?.();
            },
            onProgress: (seconds) => {
                opts?.stream?.onData?.(
                    ob
                        .update(id, (item) => {
                            item.duration.seconds = seconds;
                        })
                        .get(),
                );
            },
        });

        return ob.get();
    }
}
