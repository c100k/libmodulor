import type http from 'node:http';
import type https from 'node:https';
import type { ServerManagerSettings } from '../server/ServerManager.js';
export type Server = http.Server | https.Server;
export type ListenSettings = Pick<ServerManagerSettings, 'server_binding_host' | 'server_binding_port'>;
