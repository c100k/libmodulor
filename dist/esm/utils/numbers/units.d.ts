import type { ExtractStrict } from '../types/utility-types.js';
declare const CORE_UNITS: readonly ["acre", "bit", "byte", "celsius", "centimeter", "day", "degree", "fahrenheit", "fluid-ounce", "foot", "gallon", "gigabit", "gigabyte", "gram", "hectare", "hour", "inch", "kilobit", "kilobyte", "kilogram", "kilometer", "liter", "megabit", "megabyte", "meter", "microsecond", "mile", "mile-scandinavian", "milliliter", "millimeter", "millisecond", "minute", "month", "nanosecond", "ounce", "percent", "petabyte", "pound", "second", "stone", "terabit", "terabyte", "week", "yard", "year"];
export type CoreUnit = (typeof CORE_UNITS)[number];
export type SquareableUnit = ExtractStrict<CoreUnit, 'acre' | 'foot' | 'inch' | 'hectare' | 'kilometer' | 'meter' | 'mile' | 'mile-scandinavian' | 'millimeter' | 'yard'>;
export type SquareUnit = `square-${SquareableUnit}`;
export type Unit = CoreUnit | SquareUnit;
export declare function isSquareUnit(unit: string): unit is SquareUnit;
export declare function baseFromSquareUnit(unit: SquareUnit): CoreUnit;
export {};
