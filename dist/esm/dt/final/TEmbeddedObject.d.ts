import { TObject, type TObjectConstraints } from '../base/TObject.js';
export type EmbeddedObject<E extends object = object> = E;
export declare class TEmbeddedObject<E extends object = object> extends TObject<EmbeddedObject<E>> {
    protected constraints: TObjectConstraints;
    constructor(constraints?: TObjectConstraints);
}
