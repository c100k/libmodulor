import type { DateISO8601 } from '../../dt/index.js';
import { StdDateClockManager } from './StdDateClockManager.js';
export declare const FAKE_CLOCK_MANAGER_NOW: DateISO8601;
export declare class FakeClockManager extends StdDateClockManager {
    now(): Date;
}
