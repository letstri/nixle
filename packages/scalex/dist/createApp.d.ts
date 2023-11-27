import { type Logger } from './logger/logger';
import { type Module } from './modules/createModule';
import { type HTTPMethod } from './utils/HTTPMethod';
import { type Route } from './router/createRouter';
export type MethodHandler = (path: Route['path'], handler: Route['handler']) => void;
export type ApiMethods = Record<Lowercase<HTTPMethod>, MethodHandler>;
export interface Provider<Server> {
    methods: ApiMethods;
    server: Server;
}
export interface AppOptions {
    modules: Module[];
    logger?: Logger;
}
export declare const createApp: <Server>(provider: Provider<Server>, { logger: _logger, ...options }: AppOptions) => Server;
