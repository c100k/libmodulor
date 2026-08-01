import type { ServiceDefinition } from '@grpc/grpc-js';
import type { Root, Service } from 'protobufjs';
export declare function serviceDefinition(root: Root, service: Service): ServiceDefinition;
