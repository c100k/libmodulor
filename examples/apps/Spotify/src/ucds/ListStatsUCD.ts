import {
    AuthenticatedUCPolicy,
    type FreeTextShort,
    SendClientMain,
    TFreeTextShort,
    TNumber,
    type UCDef,
    type UCInput,
    type UCOPIBase,
    type UIntQuantity,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import { ListStatsServerMain } from './ListStatsServerMain.js';

export interface ListStatsInput extends UCInput {}

export interface ListStatsOPI0 extends UCOPIBase {
    name: FreeTextShort;
    value: UIntQuantity;
}

export const ListStatsUCD: UCDef<ListStatsInput, ListStatsOPI0> = {
    ext: {
        http: {
            mountAt: '/stats',
        },
    },
    io: {
        o: {
            parts: {
                _0: {
                    fields: {
                        name: {
                            type: new TFreeTextShort(),
                        },
                        value: {
                            type: new TNumber(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: AuthenticatedUCPolicy,
        },
        server: {
            main: ListStatsServerMain,
            policy: AuthenticatedUCPolicy,
        },
    },
    metadata: Manifest.ucReg.ListStats,
};
