import { NextJSAPIRouteHandler } from 'libmodulor/nextjs';
import type { NextRequest, NextResponse } from 'next/server.js';

import {
    CancelOrderUCD,
    Manifest,
} from '../../../../../../../../apps/Trading/index.js';
import container from '../../../../container-server.js';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    return (
        await container.get(NextJSAPIRouteHandler).exec({
            appManifest: Manifest,
            req,
            ucd: CancelOrderUCD,
        })
    ).res;
}
