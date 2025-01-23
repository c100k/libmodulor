import { TObject, TObjectShapeValidationStrategy, } from '../base/TObject.js';
export class TEmbeddedObject extends TObject {
    constraints;
    constructor(constraints = {
        shapeValidationStrategy: TObjectShapeValidationStrategy.SAME_AS_EXAMPLE,
    }) {
        super(constraints);
        this.constraints = constraints;
    }
}
