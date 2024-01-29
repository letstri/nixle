/// <reference types="node" />
import type { ConsolaOptions } from 'consola';
import type dotenv from 'dotenv';
import type { Provider } from './provider/createProvider';
import type { Plugin } from './plugins/createPlugin';
import { type Router } from '.';
type ConvertRouters<T extends Router[]> = {
    [P in T[number]['path']]: Extract<T[number], {
        path: P;
    }>['$inferRoutes'];
};
export interface AppOptions<Routers extends Router[] = Router[]> {
    provider: Provider;
    routers: Routers;
    plugins?: Plugin[];
    logger?: Partial<ConsolaOptions> | false;
    env?: dotenv.DotenvConfigOptions;
    globalPrefix?: string;
}
export type NixleApp = ReturnType<typeof createApp>;
export declare function createApp<Routers extends Router[] = Router[]>(options: AppOptions<Routers>): {
    app: any;
    events: {
        on: (eventName: string | symbol, listener: (...args: any[]) => void) => import("events");
        emit: (eventName: string | symbol, ...args: any[]) => boolean;
    };
    $inferRouters: ConvertRouters<Routers>;
};
export {};
