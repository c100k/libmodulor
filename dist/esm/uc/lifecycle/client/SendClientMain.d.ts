import type { UCInput } from '../../input.js';
import type { UCMain, UCMainInput } from '../../main.js';
import type { UCOPIBase } from '../../opi.js';
import type { UCOutputOrNothing } from '../../output.js';
import type { UCTransporter } from '../../transporter.js';
export declare class SendClientMain<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> implements UCMain<I, OPI0, OPI1> {
    private ucTransporter;
    constructor(ucTransporter: UCTransporter);
    exec({ opts, uc, }: UCMainInput<I, OPI0, OPI1>): Promise<UCOutputOrNothing<OPI0, OPI1>>;
}
