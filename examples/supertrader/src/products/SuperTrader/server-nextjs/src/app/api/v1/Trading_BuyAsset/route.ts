import type { NextRequest, NextResponse } from 'next/server.js';

import {
    BuyAssetUCD,
    Manifest,
} from '../../../../../../../../apps/Trading/index.js';
import { execReq } from '../../../../lib-server/execReq.js';

export async function POST(req: NextRequest): Promise<NextResponse> {
    return execReq(req, Manifest, BuyAssetUCD);
}
