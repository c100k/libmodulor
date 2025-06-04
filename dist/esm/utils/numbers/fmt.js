import { baseFromSquareUnit, isSquareUnit } from './units.js';
export function fmt(value, unit, decimalsCount) {
    if (!unit) {
        return new Intl.NumberFormat(undefined, {
            maximumFractionDigits: decimalsCount,
        }).format(value);
    }
    let formatterUnit;
    let unitSuffix = '';
    if (isSquareUnit(unit)) {
        formatterUnit = baseFromSquareUnit(unit);
        unitSuffix = '²';
    }
    else {
        formatterUnit = unit;
    }
    const formatted = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: decimalsCount,
        style: 'unit',
        unit: formatterUnit,
        unitDisplay: 'short',
    }).format(value);
    return `${formatted}${unitSuffix}`;
}
