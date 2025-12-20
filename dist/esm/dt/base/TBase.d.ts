import type { IconCode } from '../../icon/index.js';
import type { DataType } from '../DataType.js';
import type { Color } from '../final/TColor.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
import { Validation } from '../Validation.js';
type AutoCapitalizeBehavior = 'characters' | 'sentences' | 'words';
export type OptionLabel = string;
type Option<T> = {
    imgSrc?: number;
    icon?: IconCode;
    label: OptionLabel;
    value: T;
};
export type TName = Capitalize<string>;
export type SemanticsVariant = 'danger' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';
export interface SemanticsValue {
    backgroundColor?: Color;
    color?: Color;
    variant?: SemanticsVariant;
}
export type SemanticsMapping = Record<string, // corresponds to T.toString()
SemanticsValue>;
export type SemanticsPredicate<T> = (value: T) => SemanticsValue;
export interface OptionsOpts {
    shouldTranslateLabels?: boolean;
    strict?: boolean;
}
export type ConstraintsForHuman = Record<string, string>;
export declare abstract class TBase<T extends DataType> {
    static DEFAULT_OPTIONS: Required<OptionsOpts>;
    protected defaultValue: T | undefined;
    protected examples: T[] | undefined;
    protected initialValue: T | undefined;
    protected options: Option<T>[] | undefined;
    protected optionsOpts: OptionsOpts | undefined;
    protected raw: unknown | undefined;
    protected semanticsMapping: SemanticsMapping | undefined;
    protected semanticsPredicate: SemanticsPredicate<T> | undefined;
    abstract tName(): TName;
    assign(raw: unknown): this;
    autoCapitalizeBehavior(): AutoCapitalizeBehavior | undefined;
    clear(): void;
    example(): T;
    fmt(ifNullOrUndefined?: string): string;
    getDefaultValue(): T | undefined;
    getExamples(): T[] | undefined;
    getConstraintsForHuman(): ConstraintsForHuman | null;
    getInitialValue(): T | undefined;
    getOptions(): Option<T>[] | undefined;
    getSemanticsMapping(): SemanticsMapping | undefined;
    getSemanticsPredicate(): SemanticsPredicate<T> | undefined;
    hasOptions(): boolean;
    hasStrictOptions(): boolean;
    htmlInputType(): HTMLInputType;
    isSensitive(): boolean;
    rnInputMode(): RNInputMode;
    setDefaultValue(defaultValue: T): this;
    setExamples(examples: T[]): this;
    setInitialValue(initialValue: T): this;
    restrictOptions(v: T[]): this;
    setOptions(options: Option<T>[], opts?: OptionsOpts): this;
    setSemanticsMapping(semanticsMapping: SemanticsMapping): this;
    setSemanticsPredicate(semanticsPredicate: SemanticsPredicate<T>): this;
    shouldTranslateOptions(): boolean;
    val(): T | undefined;
    validate(): Validation;
}
export {};
