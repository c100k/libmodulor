import { TObject, TObjectShapeValidationStrategy } from '../base/TObject.js';
import { TFileMimeType, } from './TFileMimeType.js';
import { TFileName } from './TFileName.js';
import { TFilePath } from './TFilePath.js';
export class TFile extends TObject {
    fileConstraints;
    // We consider them generic enough to not having to be translated
    static UNITS = [
        'B',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB',
    ];
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
            name: TFilePath.FILE_NAME,
            path: `${TFilePath.ABS_PATH}/${TFilePath.FILE_NAME}`,
            size: TFilePath.FILE_SIZE,
            type: TFilePath.MIME_TYPE,
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
        const { maxSizeInBytes, minSizeInBytes, type } = this.fileConstraints;
        validation.concat(new TFileMimeType(type).assign(val.type).validate());
        const { size } = val;
        if (minSizeInBytes && size < minSizeInBytes) {
            validation.add({
                constraint: 'minSize',
                expected: this.fmtBytes(minSizeInBytes),
            });
        }
        if (maxSizeInBytes && size > maxSizeInBytes) {
            validation.add({
                constraint: 'maxSize',
                expected: this.fmtBytes(maxSizeInBytes),
            });
        }
        return validation;
    }
    allowed() {
        return this.fileConstraints.type.allowed;
    }
    fmtBytes(bytes, decimals = 2) {
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${TFile.UNITS[i]}`;
    }
    withOneExample(name) {
        this.setExamples([
            {
                name,
                path: `${TFilePath.ABS_PATH}/${name}`,
                size: TFilePath.FILE_SIZE,
                type: this.fileConstraints.type.allowed[0] ?? TFilePath.MIME_TYPE,
            },
        ]);
        return this;
    }
}
