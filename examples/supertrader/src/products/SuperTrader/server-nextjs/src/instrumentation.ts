export async function register(): Promise<void> {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { ServerBooter } = await import('libmodulor');
        const { default: container } = await import('./container-server.js');

        await container.get(ServerBooter).exec({
            autoMountUCs: false,
            srcImporter: (path) => import(/* webpackIgnore: true */ path),
        });
    }
}
