import type { Timestamp } from '../../dt/index.js';
import type { ClockManager, ClockManagerDateKey } from '../ClockManager.js';
export declare class StdDateClockManager implements ClockManager {
    now(): Date;
    nowToKey(): ClockManagerDateKey;
    time(): Timestamp;
}
