import type { extendRouterOptions } from '../router/createRouter';
import type { extendServiceOptions } from '../service/createService';
import type { NixleApp } from '../createApp';
import type { log } from '../logger';
interface PluginOptions<Server> {
    nixleApp: NixleApp<Server>;
    log: typeof log;
    extendRouterOptions: typeof extendRouterOptions;
    extendServiceOptions: typeof extendServiceOptions;
}
type PluginFunction<Server> = (options: PluginOptions<Server>) => void;
export type Plugin<Server> = [name: string, plugin: PluginFunction<Server>];
export declare const createPlugin: <Server = unknown>(name: string, plugin: PluginFunction<Server>) => Plugin<Server>;
export {};
