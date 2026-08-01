import { Type } from 'protobufjs';
const EMPTY_TYPE_NAME = 'Empty';
export function fieldNum(current) {
    // TODO : Keep memory of the numbers in some way
    // Let's say we have the following fields : a, b, c, d
    // That will give us : a = 1, b = 2, c = 3, d = 4
    // If we introduce a new field named a1, it will give us a = 1, a1 = 2, b = 3, c = 4, d = 5
    // All the subsequent fields are incremented, which is not good as it breaks compatibility.
    // For now it's fine as we control the server and the client.
    // @see https://protobuf.dev/programming-guides/proto3
    return (current ?? 0) + 1;
}
export function ucEmptyType() {
    return new Type(EMPTY_TYPE_NAME);
}
