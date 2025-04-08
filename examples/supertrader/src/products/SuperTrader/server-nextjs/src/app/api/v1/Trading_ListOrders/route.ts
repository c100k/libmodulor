import type { NextRequest, NextResponse } from 'next/server.js';

import {
    ListOrdersUCD,
    Manifest,
} from '../../../../../../../../apps/Trading/index.js';
import { execReq } from '../../../../lib-server/execReq.js';

export async function GET(req: NextRequest): Promise<NextResponse> {
    return execReq(req, Manifest, ListOrdersUCD);
}
