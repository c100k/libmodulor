import { range, TYear, type Year } from '../../../../../dist/esm/index.js';

export type AlbumReleaseYear = Year;

export class TAlbumReleaseYear extends TYear {
    constructor() {
        super();
        this.setOptions(
            range(2026)
                .filter((v) => v > 1900)
                .map((y) => ({
                    label: y.toString(),
                    value: y,
                }))
                .reverse(),
        );
    }
}
