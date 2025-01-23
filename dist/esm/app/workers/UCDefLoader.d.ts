import type { Worker } from '../../std/index.js';
import type { UCDef, UCDefSourceSafe, UCInput, UCName, UCOPIBase } from '../../uc/index.js';
import type { SrcImporter } from '../../utils/index.js';
import { AppSrcFilePathBuilder, type Input as AppSrcFilePathBuilderInput } from './AppSrcFilePathBuilder.js';
export type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Omit<AppSrcFilePathBuilderInput, 'filePathParts'> & {
    srcImporter: SrcImporter<UCDefSourceSafe<I, OPI0, OPI1>>;
    ucName: UCName;
};
type Output<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCDef<I, OPI0, OPI1>;
export declare class UCDefLoader implements Worker<Input, Promise<Output>> {
    private appSrcFilePathBuilder;
    constructor(appSrcFilePathBuilder: AppSrcFilePathBuilder);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appName, appsRootAlias, appsRootAliasUseDefault, appsRootPath, ext, srcImporter, ucName, }: Input<I, OPI0, OPI1>): Promise<Output<I, OPI0, OPI1>>;
}
export {};
