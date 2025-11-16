import { inject, injectable } from 'inversify';

import type {
    Configurable,
    Logger,
    Settings,
    SettingsManager,
    UIntDuration,
    Worker,
} from '../../../../../dist/esm/index.js';

interface I {
    durationInS: UIntDuration;
    onDone: () => void;
    onProgress: (seconds: UIntDuration) => void;
}

interface O {
    stop: () => void;
}

export interface SongPlayerSettings extends Settings {
    song_player_speed: 1 | 100;
}

type S = SongPlayerSettings;

@injectable()
export class SongPlayer implements Configurable<S>, Worker<I, Promise<O>> {
    constructor(
        @inject('Logger') private logger: Logger,
        @inject('SettingsManager') private settingsManager: SettingsManager<S>,
    ) {}

    public s(): SongPlayerSettings {
        return {
            song_player_speed: this.settingsManager.get()('song_player_speed'),
        };
    }

    public async exec({ durationInS, onDone, onProgress }: I): Promise<O> {
        let seconds = 0;

        const intervalID = setInterval(() => {
            if (seconds === durationInS + 1) {
                clearInterval(intervalID);
                onDone();
                return;
            }

            this.logger.debug('Playing second %d of the song', seconds);
            onProgress(seconds);

            seconds += 1;
        }, 1000 / this.s().song_player_speed);

        return {
            stop: () => clearInterval(intervalID),
        };
    }
}
