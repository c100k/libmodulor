import type { Logger, SettingsManager } from '../../../std/index.js';
import type { EntrypointsBuilder } from '../server/EntrypointsBuilder.js';
import type { ListenSettings, Server, StopSettings } from './types.js';
export declare function listen(server: Server, entrypointsBuilder: EntrypointsBuilder, logger: Logger, settingsManager: SettingsManager<ListenSettings>): void;
export declare function stop(server: Server, settingsManager: SettingsManager<StopSettings>): Promise<void>;
