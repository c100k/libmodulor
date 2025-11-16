// Expose only what's necessary

export { I18n } from './src/i18n.js';
export type { GeospatialManager } from './src/lib/geospatial/GeospatialManager.js';
export { SimpleGeospatialManager } from './src/lib/geospatial/SimpleGeospatialManager.js';
export type {
    LinkManager,
    LinkManagerOpenable,
    LinkManagerOpenOpts,
} from './src/lib/link/LinkManager.js';
export { Manifest } from './src/manifest.js';
export {
    type AuthenticateToStravaStep1Input,
    AuthenticateToStravaStep1UCD,
} from './src/ucds/AuthenticateToStravaStep1UCD.js';
export {
    type AuthenticateToStravaStep2Input,
    type AuthenticateToStravaStep2OPI0,
    AuthenticateToStravaStep2UCD,
} from './src/ucds/AuthenticateToStravaStep2UCD.js';
export {
    type GenerateRunningMapFromStravaInput,
    type GenerateRunningMapFromStravaOPI0,
    GenerateRunningMapFromStravaUCD,
} from './src/ucds/GenerateRunningMapFromStravaUCD.js';
