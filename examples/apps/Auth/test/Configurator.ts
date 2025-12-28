import {
    type AppTesterConfiguratorSpecificAssertions,
    type AppTesterCtx,
    type JWTManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TPassword,
    type UCExecutorAssertion,
    type UCExecutorExecOutput,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { SignInInput, SignInOPI0 } from '../src/ucds/SignInUCD.js';

export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        await this.updateSettings<JWTManagerSettings>(ctx, {
            ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
            jwt_manager_secret: new TPassword().example(),
        });
    }

    public override async specificAssertions(): Promise<
        AppTesterConfiguratorSpecificAssertions | undefined
    > {
        return new Map([
            ...[
                '44264f8ce4d9668eb7b3cd20ebf624045a88a819327b78b2ccaf03bdfd9e52f6',
                '5b6561f93a78241c1a5527825ddfea50348c86bf8743704b7f403673eb571c09',
            ].map(
                (h) =>
                    [h, this.assertSignIn] as readonly [
                        string,
                        UCExecutorAssertion,
                    ],
            ),
        ]);
    }

    private assertSignIn(exec: UCExecutorExecOutput): boolean {
        const io = exec.io as UCExecutorExecOutput<
            SignInInput,
            SignInOPI0
        >['io'];
        // biome-ignore lint/style/noNonNullAssertion: we want it
        const { items } = io.o!.parts._0;
        // biome-ignore lint/style/noNonNullAssertion: we want it
        const item = items[0]!;

        return item.jwt.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    }
}
