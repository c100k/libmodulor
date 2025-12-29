export async function register(): Promise<void> {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { default: container } = await import('./container-server.js');
        const { ServerBooter } = await import(
            '../../../../../../dist/esm/index.js'
        );

        await container.get(ServerBooter).exec({
            autoMountUCs: false,
            srcImporter: (path) => import(/* webpackIgnore: true */ path),
        });
    }
}
