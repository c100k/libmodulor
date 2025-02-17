export function sleep(durationInMs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, durationInMs);
    });
}
