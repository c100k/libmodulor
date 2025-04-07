import {
    type AppManifest,
    type ServerError,
    UCBuilder,
    type UCDef,
    type UCInput,
    type UCManager,
    type UCOPIBase,
} from 'libmodulor';
import { type NextRequest, NextResponse } from 'next/server.js';

import container from '../container-server.js';
import { CustomerFacingErrorBuilder } from './CustomerFacingErrorBuilder.js';
import { init } from './init.js';

export async function execReq<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>(
    req: NextRequest,
    appManifest: AppManifest,
    ucd: UCDef<I, OPI0, OPI1>,
): Promise<NextResponse> {
    try {
        await init();

        const ucManager = container.get<UCManager>('UCManager');
        const ucBuilder = container.get(UCBuilder);

        const uc = ucBuilder.exec({
            appManifest,
            auth: null,
            def: ucd,
        });

        try {
            const input = await req.json();
            uc.fill(input);
        } catch (err) {
            // Ignore
        }

        const output = await ucManager.execServer(uc);
        if (!output) {
            return NextResponse.json({}, { status: 204 });
        }

        return NextResponse.json(output);
    } catch (err) {
        const { error } = container.get(CustomerFacingErrorBuilder).exec({
            error: err as Error,
        });

        return NextResponse.json<ServerError>(error.toObj(), {
            status: error.httpStatus,
        });
    }
}
