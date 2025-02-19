import type { UCDefSourceRaw } from '../def.js';
/**
 * Strip the server part of the UCD
 *
 * To be used by bundlers when building for the web for example, or any other clients (e.g. React Native).
 *
 * WARNING : This implementation is very naive and will have unexpected behaviors when the UCD has a specific shape.
 * For instance, if there is another `server: {` occurence than the lifecycle.server definition, it will be wrongly replaced.
 *
 * TODO : Make this implementation more robust (let's try not to use an AST parser though, to keep things fast and simple).
 *
 * @param source
 * @returns
 */
export declare function stripUCDLifecycleServer(source: UCDefSourceRaw): UCDefSourceRaw;
