export interface SideEffect<I extends object | undefined = undefined, O extends object | undefined = undefined> {
    i: I;
    o: O;
}
export type AnySideEffect = SideEffect<any, any>;
export interface SideEffectable {
    sideEffects(): Promise<AnySideEffect[]>;
}
