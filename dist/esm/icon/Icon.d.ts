/**
 * The icon code (e.g. https://fontawesome.com/v6/search?ic=free-collection)
 *
 * There are thousands of them so we voluntarily keep it a simple string and not a union type that would become unmaintainable.
 *
 * You can naturally use a different icon library as long as the renderer handles it.
 */
export type IconCode = string;
