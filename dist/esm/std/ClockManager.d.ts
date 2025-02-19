import type { Timestamp } from '../dt/index.js';
/**
 * A key representing the date (e.g. 20241125141012)
 *
 * Useful to set a prefix when naming files in order to sort them
 */
export type ClockManagerDateKey = string;
export interface ClockManager {
    now(): Date;
    nowToKey(): ClockManagerDateKey;
    time(): Timestamp;
}
