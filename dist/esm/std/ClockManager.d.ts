import type { Timestamp } from '../dt/index.js';
export type ClockManagerDateKey = string;
export interface ClockManager {
    now(): Date;
    nowToKey(): ClockManagerDateKey;
    time(): Timestamp;
}
