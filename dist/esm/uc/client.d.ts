import type { Class } from '../utils/index.js';
import type { UCDef } from './def.js';
import type { UCInput } from './input.js';
import type { UCMain } from './main.js';
import type { UCOPIBase } from './opi.js';
import type { UCPolicy } from './policy.js';
export interface UCClientDef<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    main: Class<UCMain<I, OPI0, OPI1>>;
    policy: Class<UCPolicy<I, OPI0, OPI1>>;
}
export interface UCClientConfirmConfig {
    cancel: string;
    confirm: string;
    message: string | null;
    title: string;
}
export interface UCClientConfirmManager {
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): Promise<boolean>;
}
