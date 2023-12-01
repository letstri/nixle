import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './services/logger';
import type { Module } from './modules/createModule';
import { buildModules } from './modules/buildModules';
import type { Provider } from './createProvider';
import { createInternalError, logAndFormatError } from './createError';
import { emitter } from './services/emmiter';
import type { createPlugin } from './plugins/createPlugin';
import { buildPlugins } from './plugins/buildPlugins';

export interface AppOptions<Server> {
  provider: Provider<Server>;
  modules: Module[];
  plugins?: ReturnType<typeof createPlugin>[];
  logger?: Partial<ConsolaOptions>;
}

export type NixleApp<Server> = ReturnType<typeof createApp<Server>>;

export const createApp = <Server = unknown>(options: AppOptions<Server>) => {
  createLogger(options.logger || {});

  if (!options.provider) {
    try {
      createInternalError('Provider is required');
    } catch (e) {
      logAndFormatError(e);
      process.exit(1);
    }
  }

  if (options.modules.length === 0) {
    try {
      createInternalError('At least one module is required');
    } catch (e) {
      logAndFormatError(e);
      process.exit(1);
    }
  }

  buildModules(options);

  log('🫡 Application successfully started', { type: 'success' });

  const app = {
    app: options.provider.app,
    events: {
      on: emitter.on,
      emit: emitter.emit,
    },
    createRoute: options.provider.request,
  };

  if (options.plugins) {
    buildPlugins(app, options);
  }

  return app;
};
