import { assertTransformedCorrectly, isFileEligible, } from '../funcs.js';
import { transform } from '../typescript.js';
export default function loader(source) {
    // @ts-expect-error : magically made available by Webpack at execution
    const fileName = this.resourcePath;
    if (!isFileEligible(fileName, ['ts'])) {
        return source;
    }
    const transformed = transform(source, fileName);
    assertTransformedCorrectly(transformed, fileName);
    return transformed;
}
