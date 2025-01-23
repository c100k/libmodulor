export var UCExecMode;
(function (UCExecMode) {
    UCExecMode["AUTO"] = "auto";
    UCExecMode["USER"] = "user";
})(UCExecMode || (UCExecMode = {}));
export function ucIsDisabled(execState) {
    return execState !== 'idle';
}
export function ucIsLoading(execState) {
    return execState === 'submitting';
}
