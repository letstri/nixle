import { type Logger, createLogger, log } from './logger/logger';
import { type Module } from './modules/createModule';
import { type HTTPMethod } from './utils/HTTPMethod';
import { buildModules } from './modules/buildModules';
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

export const createApp = <Server>(
  provider: Provider<Server>,
  { logger: _logger, ...options }: AppOptions,
) => {
  if (_logger) {
    createLogger(_logger);
  }

  log('Starting an application...');
  buildModules(provider, options.modules);
  log('Application successfully started');

  return provider.server;
};
