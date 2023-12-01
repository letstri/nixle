import { log } from './services/logger';
interface PluginOptions<Server> {
    app: Server;
    log: typeof log;
}
export declare const createPlugin: <Server>(name: string, plugin: (options: PluginOptions<Server>) => Server) => (app: Server) => readonly [string, Server];
export {};
