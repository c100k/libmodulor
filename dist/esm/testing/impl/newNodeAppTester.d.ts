import { type HostPort, type NumIndex } from '../../dt/index.js';
import { AppTester, type AppTesterInitArgs } from '../AppTester.js';
export declare function newNodeAppTester(serverPortRangeStart: HostPort, idx: NumIndex, args: Omit<AppTesterInitArgs, 'serverClientSettings'>): Promise<AppTester>;
