import { TObject, TObjectShapeValidationStrategy } from '../base/TObject.js';
import { TFileMimeType } from './TFileMimeType.js';
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
            size: TFilePath.FILE_SIZE,
            type: TFilePath.MIME_TYPE,
            uri: `${TFilePath.ABS_PATH}/${TFilePath.FILE_NAME}`,
        };
    }
    getConstraintsForHuman() {
        const c = {};
        const { accept, maxSizeInBytes, minSizeInBytes } = this.fileConstraints;
        if (minSizeInBytes) {
            // biome-ignore lint/complexity/useLiteralKeys: typescript disagrees
            c['minSizeInBytes'] = this.fmtBytes(minSizeInBytes);
        }
        if (maxSizeInBytes) {
            // biome-ignore lint/complexity/useLiteralKeys: typescript disagrees
            c['maxSizeInBytes'] = this.fmtBytes(maxSizeInBytes);
        }
        // biome-ignore lint/complexity/useLiteralKeys: typescript disagrees
        c['accept'] = accept.join(', ');
        return c;
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
        const { accept, maxSizeInBytes, minSizeInBytes } = this.fileConstraints;
        const { size, type, uri } = val;
        if (!(val instanceof File)) {
            validation.concat(new TFilePath().assign(uri).validate());
        }
        validation.concat(new TFileMimeType()
            .setOptions(accept.map((a) => ({ label: a, value: a })))
            .assign(type)
            .validate());
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
    getFileConstraints() {
        return this.fileConstraints;
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
                size: TFilePath.FILE_SIZE,
                type: this.fileConstraints.accept[0] ?? TFilePath.MIME_TYPE,
                uri: `${TFilePath.ABS_PATH}/${name}`,
            },
        ]);
        return this;
    }
}
