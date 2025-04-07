import {
    NotFoundError,
    type ServerError,
    UCBuilder,
    type UCManager,
    type UCOutput,
} from 'libmodulor';
import { type NextRequest, NextResponse } from 'next/server.js';

import {
    type ListOrdersOPI0,
    ListOrdersUCD,
    Manifest,
} from '../../../../../../../../apps/Trading/index.js';
import container from '../../../../container-server.js';
import { CustomerFacingErrorBuilder } from '../../../../lib-server/CustomerFacingErrorBuilder.js';

export async function GET(
    _req: NextRequest,
): Promise<NextResponse<UCOutput<ListOrdersOPI0> | ServerError>> {
    try {
        const ucManager = container.get<UCManager>('UCManager');
        const ucBuilder = container.get(UCBuilder);

        const uc = ucBuilder.exec({
            appManifest: Manifest,
            auth: null,
            def: ListOrdersUCD,
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
