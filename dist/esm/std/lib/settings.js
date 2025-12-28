const UNSAFE_SETTING = 'UNSAFE_CHANGE_ME';
export function unsafeDefaultSetting(suffix = '') {
    return `${UNSAFE_SETTING}${suffix}`;
}
export function assertSettingNotUnsafe(key, value) {
    if (typeof value === 'string' && value.startsWith(UNSAFE_SETTING)) {
        throw new Error(`"${key}" still has the unsafe default value. Please change it !`);
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
        // 1m  : bold ; 33m : yellow/orange ; 0m  : reset
        const message = `\x1b[1m\x1b[33m[WARNING] THE SETTINGS ARE NOT SAFE (THIS WILL THROW IN PROD) :\n${violations.join('\n')}\x1b[0m`;
        if (throwIfViolations) {
            throw new Error(message);
        }
        // biome-ignore lint/suspicious/noConsole: we want it
        console.warn(message);
    }
}
