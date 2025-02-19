/**
 * Check whether a data store records corresponds to the passed type
 *
 * Useful when fetching multiple records at once and looping over them to build an aggregate
 *
 * @param rec
 * @param name
 * @returns
 */
export const recIs = (
// biome-ignore lint/suspicious/noExplicitAny: can be anything
rec, name) => rec.name === name;
