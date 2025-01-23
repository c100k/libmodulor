export interface Worker<I, O> {
    exec(input: I): O;
}
