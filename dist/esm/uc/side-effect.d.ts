export declare enum UCOutputSideEffectType {
    CLEAR_AUTH = "CLEAR_AUTH",
    REDIRECT = "REDIRECT",
    SET_AUTH = "SET_AUTH"
}
export type UCOutputSideEffect = {
    type: UCOutputSideEffectType.CLEAR_AUTH;
} | {
    type: UCOutputSideEffectType.REDIRECT;
} | {
    type: UCOutputSideEffectType.SET_AUTH;
};
