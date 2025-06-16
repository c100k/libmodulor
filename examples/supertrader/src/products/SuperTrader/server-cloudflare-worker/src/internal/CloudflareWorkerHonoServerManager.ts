import { type Context, type Handler, Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import type { HandlerResponse } from 'hono/types';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { inject, injectable } from 'inversify';
import {
    type AppManifest,
    type DirPath,
    fromFormData,
    type HTTPMethod,
    type I18nManager,
    type ServerManager,
    ServerRequestHandler,
    type ServerRequestHandlerReq,
    type ServerRequestHandlerRes,
    type UCDef,
    type UCHTTPContract,
    type UCInput,
    type UCManager,
    type UCOPIBase,
    type URL,
} from 'libmodulor';

@injectable()
export class CloudflareWorkerHonoServerManager implements ServerManager {
    protected runtime!: Hono;

    constructor(
        @inject('I18nManager') private i18nManager: I18nManager,
        @inject(ServerRequestHandler)
        private serverRequestHandler: ServerRequestHandler,
        @inject('UCManager') private ucManager: UCManager,
    ) {}

    public getRuntime(): Hono {
        return this.runtime;
    }

    public overrideUCManager(ucManager: UCManager): void {
        this.ucManager = ucManager;
    }

    public async init(): Promise<void> {
        throw new Error(
            'Use initSync instead of init as workers do not support top-level await',
        );
    }

    public initSync(): void {
        this.runtime = new Hono();

        this.runtime.use(secureHeaders());
        this.runtime.use(logger());
        this.runtime.notFound((c) => {
            return c.json({}, 404);
        });
    }

    public async mount<
        I extends UCInput | undefined = undefined,
        OPI0 extends UCOPIBase | undefined = undefined,
        OPI1 extends UCOPIBase | undefined = undefined,
    >(
        _appManifest: AppManifest,
        _ucd: UCDef<I, OPI0, OPI1>,
        _contract: UCHTTPContract,
    ): Promise<void> {
        throw new Error(
            'Use mountSync instead of mount as workers do not support top-level await',
        );
    }

    public mountSync<
        I extends UCInput | undefined = undefined,
        OPI0 extends UCOPIBase | undefined = undefined,
        OPI1 extends UCOPIBase | undefined = undefined,
    >(
        appManifest: AppManifest,
        ucd: UCDef<I, OPI0, OPI1>,
        contract: UCHTTPContract,
    ): void {
        const { envelope, method, path, pathAliases } = contract;
        const httpMethod = method.toLowerCase() as Lowercase<HTTPMethod>;

        if (
            httpMethod === 'connect' ||
            httpMethod === 'head' ||
            httpMethod === 'trace'
        ) {
            throw new Error(`Unsupported HTTP method : ${httpMethod}`);
        }

        const handler: Handler = async (
            c,
        ): Promise<HandlerResponse<object>> => {
            // Unlike servers having a "setup" phase where we can initialize things, we need to initialize in request handlers
            await this.i18nManager.init();

            const { body, status } = await this.serverRequestHandler.exec<
                I,
                OPI0,
                OPI1
            >({
                appManifest,
                envelope,
                req: this.toReq(c),
                res: this.toRes(c),
                ucd,
                ucManager: this.ucManager,
            });

            if (!body) {
                return c.newResponse(null, status);
            }

            return c.json(body, status as ContentfulStatusCode);
        };

        this.runtime[httpMethod](path, handler);
        for (const pathAlias of pathAliases) {
            this.runtime[httpMethod](pathAlias, handler);
        }
    }

    public async mountStaticDir(_dirPath: DirPath): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async start(): Promise<void> {
        throw new Error(
            'Let Cloudflare handle the lifecycle of the server manager',
        );
    }

    public async stop(): Promise<void> {
        throw new Error(
            'Let Cloudflare handle the lifecycle of the server manager',
        );
    }

    public async warmUp(): Promise<void> {
        // Nothing to do
    }

    private toReq(c: Context): ServerRequestHandlerReq {
        return {
            bodyFromFormData: async () => fromFormData(await c.req.formData()),
            bodyFromJSON: () => c.req.json(),
            bodyFromQueryParams: async () => c.req.queries(),
            bodyRaw: c.req.raw,
            cookie: async (name) => getCookie(c, name),
            header: async (name) => c.req.header(name),
            method: c.req.method as HTTPMethod,
            secure: c.req.url.startsWith('https://'),
            url: c.req.url as URL,
        };
    }

    private toRes(c: Context): ServerRequestHandlerRes {
        return {
            clearCookie: async (name) => {
                deleteCookie(c, name);
            },
            redirect: async (location) => {
                c.redirect(location);
            },
            setCookie: async ({ name, opts, val }) =>
                setCookie(c, name, val, opts),
        };
    }
}
