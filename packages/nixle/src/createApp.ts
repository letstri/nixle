import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './logger';
import type { Module } from './modules/createModule';
import { buildModules } from './modules/buildModules';
import type { Provider } from './provider/createProvider';
import { createInternalError, logError } from './createError';
import { emitter } from './emmiter';
import type { Plugin } from './plugins/createPlugin';
import { buildPlugins } from './plugins/buildPlugins';

export interface AppOptions {
  provider: Provider;
  modules: Module[];
  plugins?: Plugin[];
  logger?: Partial<ConsolaOptions>;
  globalPrefix?: string;
}

export type NixleApp = ReturnType<typeof createApp>;

export const createApp = (options: AppOptions) => {
  createLogger(options.logger || {});

  try {
    if (!options.provider) {
      createInternalError('Provider is required');
    }
    if (options.modules.length === 0) {
      createInternalError('At least one module is required');
    }
  } catch (e) {
    logError(e);
    process.exit(1);
  }

  buildModules(options);

  const app = {
    app: options.provider.app,
    events: {
      on: emitter.on,
      emit: emitter.emit,
    },
    createRoute: options.provider.createRoute,
  };

  if (options.plugins) {
    buildPlugins(app, options);
  }

  log('🫡  Application successfully started', { type: 'success' });

  return app;
};
