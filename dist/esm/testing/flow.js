export function appTesterFlow(args) {
    return args;
}
export function appTesterFlowRead00(output) {
    // biome-ignore lint/style/noNonNullAssertion: we want it
    return output.out.io.o.parts._0.items[0];
}
export function appTesterFlowReadSideEffect(output, key) {
    return output.out.sideEffects?.get(key) ?? null;
}
