import type { ConsolaOptions } from 'consola';
import type dotenv from 'dotenv';
import type { Provider } from './provider/createProvider';
import type { Plugin } from './plugins/createPlugin';
import { type Router } from '.';
import { type Middleware } from './createMiddleware';
import type { Module } from './createModule';
type ConvertModules<M extends Module[]> = M[number]['routers'];
type ConvertRouters<R extends Router[]> = {
    [P in R[number]['path']]: Extract<R[number], {
        path: P;
    }>['$inferRoutes'];
};
export interface AppOptions<Modules extends Module[] = Module[], Routers extends Router[] = Router[], P = any> {
    provider: Provider<P>;
    routers?: Routers;
    modules?: Modules;
    plugins?: Plugin[];
    middlewares?: Middleware[];
    logger?: Partial<ConsolaOptions> | false;
    env?: dotenv.DotenvConfigOptions;
    globalPrefix?: string;
}
export type NixleApp = ReturnType<typeof createApp>;
export declare function createApp<Modules extends Module[] = Module[], Routers extends Router[] = Router[]>(options: AppOptions<Modules, Routers>): {
    app: any;
    hooks: Pick<import("hookable").Hookable<{
        request: any;
        response: any;
        error: any;
    }, import("hookable").HookKeys<{
        request: any;
        response: any;
        error: any;
    }>>, "afterEach" | "beforeEach" | "callHook" | "hook" | "hookOnce">;
    $inferRouters: ConvertRouters<Routers> & ConvertRouters<ConvertModules<Modules>>;
};
export {};
