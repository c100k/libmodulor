import type { NextRequest, NextResponse } from 'next/server.js';

import { NextJSAPIRouteHandler } from '../../../../../../../../../../dist/esm/index.nextjs.js';
import {
    BuyAssetUCD,
    Manifest,
} from '../../../../../../../../../apps/Trading/index.js';
import container from '../../../../container-server.js';

export async function POST(req: NextRequest): Promise<NextResponse> {
    return (
        await container.get(NextJSAPIRouteHandler).exec({
            appManifest: Manifest,
            req,
            ucd: BuyAssetUCD,
        })
    ).res;
}
