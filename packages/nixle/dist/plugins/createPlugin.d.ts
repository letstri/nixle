import type { NixleApp } from '../createApp';
import type { log } from '../services/logger';
interface PluginOptions<Server> {
    nixleApp: NixleApp<Server>;
    log: typeof log;
}
type PluginFunction<Server> = (options: PluginOptions<Server>) => void;
export type Plugin<Server> = [name: string, plugin: PluginFunction<Server>];
export declare const createPlugin: <Server = unknown>(name: string, plugin: PluginFunction<Server>) => Plugin<Server>;
export {};
