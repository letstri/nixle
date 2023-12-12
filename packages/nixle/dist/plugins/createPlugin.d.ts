import type { extendRouterOptions } from '../router/createRouter';
import type { extendServiceOptions } from '../service/createService';
import type { NixleApp } from '../createApp';
import type { log } from '../logger';
interface PluginOptions {
    nixleApp: NixleApp;
    log: typeof log;
    extendRouterOptions: typeof extendRouterOptions;
    extendServiceOptions: typeof extendServiceOptions;
}
type PluginFunction = (options: PluginOptions) => void | Promise<void>;
export interface Plugin {
    name: string;
    plugin: PluginFunction;
}
export declare const createPlugin: (name: string, plugin: PluginFunction) => Plugin;
export {};
