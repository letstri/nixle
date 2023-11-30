import type { ConsolaOptions } from 'consola';
import type { Module } from './modules/createModule';
import type { Provider } from './createProvider';
export interface AppOptions<Server> {
    provider: Provider<Server>;
    modules: Module[];
    logger?: Partial<ConsolaOptions>;
}
export declare const createApp: <Server>({ provider, logger, ...options }: AppOptions<Server>) => Server;
