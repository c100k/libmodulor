import type { Slug } from '../../dt/index.js';
type State = 'idle' | 'working' | 'done' | 'blocked' | 'error';
type BlockedKind = 'permission' | 'question' | 'auth';
type Progress = number;
type InputBase = {
    /**
     * [A-Za-z0-9_.+-]{1,32}
     */
    app?: Slug;
    msg?: Base64URLString;
    title?: Base64URLString;
};
export type OSC7501Input = InputBase & ({
    state: Extract<State, 'done' | 'error' | 'idle'>;
} | {
    state: Extract<State, 'working'>;
    progress?: Progress;
} | {
    state: Extract<State, 'blocked'>;
    kind?: BlockedKind;
    progress?: Progress;
});
export declare function osc7501_isBase64able(k: string): boolean;
export {};
