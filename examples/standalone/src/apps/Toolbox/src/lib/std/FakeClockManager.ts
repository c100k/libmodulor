import { injectable } from 'inversify';
import { type DateISO8601, StdDateClockManager } from 'libmodulor';

// We set now as this specific value to make tests deterministic
export const FAKE_CLOCK_MANAGER_NOW: DateISO8601 = '2022-05-15T20:23:30.123Z';

@injectable()
export class FakeClockManager extends StdDateClockManager {
    public override now(): Date {
        return new Date(Date.parse(FAKE_CLOCK_MANAGER_NOW));
    }
}
