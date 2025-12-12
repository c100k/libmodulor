import type { EnumOf } from '../utils/index.js';
export declare const UCOutputSideEffectType: {
    /**
     * Trigger a clearing of the auth on the calling system (e.g. `SignOut`).
     */
    readonly CLEAR_AUTH: "CLEAR_AUTH";
    /**
     * Trigger a redirect on the calling system (e.g. after the final round of an OAuth1 flow)
     *
     * NOTE : This is a "final" side effects, which means it must be the last one in the array of side effects.
     * Indeed, in most servers, once you redirect, you cannot do more with the `req`/`res` (e.g. on `express`).
     *
     * It expects a field `redirect: URL` in `output.parts._0.items[0]`.
     */
    readonly REDIRECT: "REDIRECT";
    /**
     * Trigger a setting of the auth on the calling system (e.g. `SignIn` / `SignUp`).
     *
     * It expects a field `jwt: JWT` in `output.parts._0.items[0]`.
     */
    readonly SET_AUTH: "SET_AUTH";
};
export type UCOutputSideEffectType = EnumOf<typeof UCOutputSideEffectType>;
export type UCOutputSideEffect = {
    type: typeof UCOutputSideEffectType.CLEAR_AUTH;
} | {
    type: typeof UCOutputSideEffectType.REDIRECT;
} | {
    type: typeof UCOutputSideEffectType.SET_AUTH;
};
