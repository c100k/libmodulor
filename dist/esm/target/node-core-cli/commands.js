import { ucMountingPoint, ucifIsMandatory } from '../../uc/index.js';
import { fmtBold, fmtCommand, fmtPadEndFor, fmtSection, } from '../../utils/index.js';
import { print } from '../lib/cli/renderer.js';
const FLAG_PREFIX = '--';
const CORE_FLAGS = [
    ['help', 'View the available commands and flags'],
    ['version', 'View the version'],
];
const COMMAND_FLAG_INDENT = '    ';
const MANDATORY_LABEL = '(mandatory)';
const DEFAULT_LABEL = (defaultValue) => `(default: ${defaultValue})`;
const COMMANDS_TITLE = 'Commands';
const FLAGS_TITLE = 'Flags';
export function showHelp(ucs, wordingManager) {
    const coreFlags = CORE_FLAGS.map(([f]) => `${FLAG_PREFIX}${f}`);
    const mountingPoints = ucs.map((uc) => ucMountingPoint(uc));
    const ucFieldsNames = ucs.flatMap((uc) => uc.inputFields.map((f) => `${FLAG_PREFIX}${f.key}`));
    const words = [...coreFlags, ...mountingPoints, ...ucFieldsNames];
    const padEnd = fmtPadEndFor(words);
    const { desc } = wordingManager.p();
    if (desc) {
        print(fmtBold(desc));
    }
    print(fmtSection(COMMANDS_TITLE));
    let i = 0;
    for (const uc of ucs) {
        const mountingPoint = uc.def.ext?.cmd?.mountAt ?? ucMountingPoint(uc);
        print(fmtCommand(mountingPoint, wordingManager.uc(uc.def).desc ?? undefined, padEnd));
        print('');
        const fields = uc.inputFieldsInsensitive();
        for (const f of fields) {
            const mandatoryLabel = ucifIsMandatory(f.def)
                ? fmtBold(MANDATORY_LABEL)
                : '';
            const defaultValue = f.def.type.getDefaultValue();
            const defaultValueLabel = defaultValue !== undefined
                ? fmtBold(DEFAULT_LABEL(defaultValue))
                : '';
            const field = `${COMMAND_FLAG_INDENT}${FLAG_PREFIX}${f.key}`;
            const { desc, label } = wordingManager.ucif(f);
            const details = [mandatoryLabel, defaultValueLabel, desc ?? label]
                .filter((s) => !!s)
                .join(' ');
            print(fmtCommand(field, details.trim(), padEnd));
        }
        if (i < ucs.length - 1) {
            print('');
        }
        i++;
    }
    print(fmtSection(FLAGS_TITLE));
    for (const [f, desc] of CORE_FLAGS) {
        print(fmtCommand(`${FLAG_PREFIX}${f}`, desc, padEnd));
    }
}
