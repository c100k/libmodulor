import type { Container } from 'inversify';
import type { ProductI18n } from '../../product/i18n.js';
import type { ProductManifest } from '../../product/index.js';
export declare function bindProduct(container: Container, productManifest: ProductManifest, productI18n: ProductI18n): void;
