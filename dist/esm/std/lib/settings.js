import { logDevWarning } from '../../error/index.js';
const UNSAFE_SETTING = 'UNSAFE_CHANGE_ME';
export function unsafeDefaultSetting(suffix = '') {
    return `${UNSAFE_SETTING}${suffix}`;
}
export function assertSettingNotUnsafe(key, value) {
    if (typeof value === 'string' && value.startsWith(UNSAFE_SETTING)) {
        throw new Error(`"${key}" still has the unsafe default value`);
    }
    if (Array.isArray(value)) {
        for (const v of value) {
            assertSettingNotUnsafe(key, v);
        }
    }
    if (typeof value === 'object' && value !== null) {
        for (const [_k, v] of Object.entries(value)) {
            assertSettingNotUnsafe(key, v);
        }
    }
}
export function checkSettings(settings, throwIfViolations) {
    const violations = [];
    for (const [k, v] of Object.entries(settings)) {
        try {
            assertSettingNotUnsafe(k, v);
        }
        catch (err) {
            violations.push(err.message);
        }
    }
    if (violations.length > 0) {
        const message = `Settings contain violations :\n${violations.join('\n')}`;
        if (throwIfViolations) {
            throw new Error(message);
        }
        logDevWarning(message);
    }
}
