import { TObject, TObjectShapeValidationStrategy } from '../base/TObject.js';
import { TFileMimeType, } from './TFileMimeType.js';
import { TFileName } from './TFileName.js';
import { TFilePath } from './TFilePath.js';
export class TFile extends TObject {
    fileConstraints;
    constructor(fileConstraints) {
        super({
            // We usually process instances of https://developer.mozilla.org/fr/docs/Web/API/File
            // Therefore, it's not strictly the same as the example, with some extra fields that we don't control.
            shapeValidationStrategy: TObjectShapeValidationStrategy.NONE,
        });
        this.fileConstraints = fileConstraints;
    }
    tName() {
        return 'File';
    }
    example() {
        return {
            name: 'picture.png',
            path: '/Users/dexter/Desktop/picture.png',
            type: 'image/png',
        };
    }
    htmlInputType() {
        return 'file';
    }
    validate() {
        const validation = super.validate();
        if (!validation.isOK()) {
            return validation;
        }
        const val = this.raw;
        validation.concat(new TFileName().assign(val.name).validate());
        if (!(val instanceof File)) {
            validation.concat(new TFilePath().assign(val.path).validate());
        }
        validation.concat(new TFileMimeType(this.fileConstraints.type)
            .assign(val.type)
            .validate());
        // TODO : Add validation on file size
        return validation;
    }
}
