import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './logger/logger';
import type { Module } from './modules/createModule';
import { buildModules } from './modules/buildModules';
import type { Provider } from './createProvider';
import { createInternalError } from './createError';
import { logAndFormatError } from './router/buildRoutes';

export interface AppOptions<Server> {
  provider: Provider<Server>;
  modules: Module[];
  logger?: Partial<ConsolaOptions>;
}

export const createApp = <Server>({ provider, logger, ...options }: AppOptions<Server>) => {
  if (!provider) {
    try {
      createInternalError('Provider is required');
    } catch (e) {
      logAndFormatError(e);
      process.exit(1);
    }
  }

  if (logger !== undefined) {
    createLogger(logger);
  }

  log('Starting an application...', { type: 'info' });
  buildModules(provider, options.modules);
  log('Application started!', { type: 'success' });

  return provider.server;
};
