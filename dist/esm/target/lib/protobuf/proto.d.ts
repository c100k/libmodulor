import { type Root, type Service } from 'protobufjs';
import type { AppName } from '../../../app/index.js';
export declare function protoFile(root: Root, services: Map<AppName, {
    service: Service;
}>): string;
