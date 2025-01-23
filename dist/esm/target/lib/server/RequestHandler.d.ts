import type { AppManifest } from '../../../app/index.js';
import type { UCDef, UCInput, UCManager, UCOPIBase } from '../../../uc/index.js';
import type { HTTPDataEnvelope } from '../../../utils/index.js';
export interface RequestHandlerInputRaw<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    envelope: HTTPDataEnvelope;
    ucd: UCDef<I, OPI0, OPI1>;
    ucManager: UCManager;
}
