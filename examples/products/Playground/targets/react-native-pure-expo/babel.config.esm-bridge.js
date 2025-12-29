import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { Plugin } = require('../../../../../dist/esm/index.babel.js');
const bridge = { Plugin };

export default bridge;
