import {
    NotFoundError,
    type ServerError,
    UCBuilder,
    type UCManager,
    type UCOutput,
} from 'libmodulor';
import { NextResponse } from 'next/server.js';

import {
    type BuyAssetOPI0,
    BuyAssetUCD,
    Manifest,
} from '../../../../../../../../apps/Trading/index.js';
import container from '../../../../container-server.js';
import { CustomerFacingErrorBuilder } from '../../../../lib-server/CustomerFacingErrorBuilder.js';

export async function POST(
    _request: Request,
): Promise<NextResponse<UCOutput<BuyAssetOPI0> | ServerError>> {
    try {
        const ucManager = container.get<UCManager>('UCManager');
        const ucBuilder = container.get(UCBuilder);

        const uc = ucBuilder.exec({
            appManifest: Manifest,
            auth: null,
            def: BuyAssetUCD,
        });
        const output = await ucManager.execServer(uc);
        if (!output) {
            throw new NotFoundError();
        }

        return NextResponse.json(output);
    } catch (err) {
        const { error } = container.get(CustomerFacingErrorBuilder).exec({
            error: err as Error,
        });

        return NextResponse.json<ServerError>(
            { message: error.message },
            { status: error.httpStatus },
        );
    }
}
