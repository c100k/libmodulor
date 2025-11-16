import {
    type AppTesterCtx,
    type JWTManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';

export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        await this.updateSettings<JWTManagerSettings>(
            ctx,
            STD_DEFAULT_JWT_MANAGER_SETTINGS,
        );
    }
}
