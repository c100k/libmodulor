// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
// https://unicode.org/reports/tr35/tr35-general.html#Unit_Elements
// https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
const CORE_UNITS = [
    'acre',
    'bit',
    'byte',
    'celsius',
    'centimeter',
    'day',
    'degree',
    'fahrenheit',
    'fluid-ounce',
    'foot',
    'gallon',
    'gigabit',
    'gigabyte',
    'gram',
    'hectare',
    'hour',
    'inch',
    'kilobit',
    'kilobyte',
    'kilogram',
    'kilometer',
    'liter',
    'megabit',
    'megabyte',
    'meter',
    'microsecond',
    'mile',
    'mile-scandinavian',
    'milliliter',
    'millimeter',
    'millisecond',
    'minute',
    'month',
    'nanosecond',
    'ounce',
    'percent',
    'petabyte',
    'pound',
    'second',
    'stone',
    'terabit',
    'terabyte',
    'week',
    'yard',
    'year',
];
export function isSquareUnit(unit) {
    return unit.startsWith('square-');
}
export function baseFromSquareUnit(unit) {
    return unit.replace('square-', '');
}
