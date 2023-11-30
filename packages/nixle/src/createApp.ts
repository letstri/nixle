import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './logger/logger';
import type { Module } from './modules/createModule';
import { buildModules } from './modules/buildModules';
import type { Provider } from './createProvider';
import { createInternalError, logAndFormatError } from './createError';

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

  if (options.modules.length === 0) {
    try {
      createInternalError('At least one module is required');
    } catch (e) {
      logAndFormatError(e);
      process.exit(1);
    }
  }

  buildModules(provider, options.modules);
  log('🫡 Application successfully started', { type: 'success' });

  return provider.server;
};
