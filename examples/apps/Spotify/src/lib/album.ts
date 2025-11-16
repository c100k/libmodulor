import {
    type FreeTextLong,
    type FreeTextShort,
    TBoolean,
    TFreeTextShort,
    TYear,
    type UCOPIBase,
    type UCOPIValue,
    type UCOutputDef,
    type Year,
} from '../../../../../dist/esm/index.js';

export interface AlbumOPI0 extends UCOPIBase {
    artist: UCOPIValue<FreeTextShort>;
    description: UCOPIValue<FreeTextLong>;
    isPrivate: UCOPIValue<boolean>;
    language: UCOPIValue<FreeTextShort>;
    name: UCOPIValue<FreeTextShort>;
    releaseYear: UCOPIValue<Year>;
    tags: UCOPIValue<FreeTextShort>;
}

export const AlbumOPIDef: UCOutputDef<AlbumOPI0> = {
    parts: {
        _0: {
            fields: {
                artist: {
                    type: new TFreeTextShort(),
                },
                description: {
                    type: new TFreeTextShort(),
                },
                isPrivate: {
                    type: new TBoolean(),
                },
                language: {
                    type: new TFreeTextShort(),
                },
                name: {
                    type: new TFreeTextShort(),
                },
                releaseYear: {
                    type: new TYear(),
                },
                tags: {
                    type: new TFreeTextShort(),
                },
            },
        },
    },
};
