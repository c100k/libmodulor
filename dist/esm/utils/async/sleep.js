/**
 * Sleep during the specified duration
 *
 * NOTE : We are in an async world so do this only when necessary or when you want to "fake" time.
 * Generally speaking, if something is fast, do not make it slower just for the sake of showing a fancy animation.
 * Well... If it's a good one, maybe.
 *
 * @param durationInMs
 * @returns
 */
export function sleep(durationInMs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, durationInMs);
    });
}
