import type { NextRequest, NextResponse } from 'next/server.js';

import {
    CancelOrderUCD,
    Manifest,
} from '../../../../../../../../apps/Trading/index.js';
import { execReq } from '../../../../lib-server/execReq.js';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    return execReq(req, Manifest, CancelOrderUCD);
}
