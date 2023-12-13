import type { ConsolaOptions } from 'consola';
import { contextLog, createLogger, log } from './logger';
import type dotenv from 'dotenv';
import type { Module } from './modules/createModule';
import { buildModules } from './modules/buildModules';
import type { Provider } from './provider/createProvider';
import { createError, logError } from './createError';
import { emitter } from './emmiter';
import type { Plugin } from './plugins/createPlugin';
import { buildPlugins } from './plugins/buildPlugins';
import { buildEnv } from './env';
import { colors } from 'consola/utils';

export interface AppOptions {
  provider: Provider;
  modules: Module[];
  plugins?: Plugin[];
  logger?: Partial<ConsolaOptions> | false;
  env?: dotenv.DotenvConfigOptions;
  globalPrefix?: string;
}

export type NixleApp = ReturnType<typeof createApp>;

export const createApp = (options: AppOptions) => {
  if (options.logger !== false) {
    createLogger(options.logger || {});
  }

  try {
    if (!options.provider) {
      createError('Provider is required');
    }
    if (options.modules.length === 0) {
      createError('At least one module is required');
    }
  } catch (e) {
    logError(e, log);
    process.exit(1);
  }

  buildEnv(options.env);
  buildModules(options);

  options.provider.globalMiddleware(({ setHeader, method, url }) => {
    setHeader('X-Powered-By', 'Nixle');

    const _log = contextLog(
      `${colors.bold(method)} ${
        url.startsWith('http') ? new URL(url).pathname : url.split('&')[0]
      }`,
      'bgGreen',
    );

    _log(`📫 Request received`, {
      type: 'info',
    });
  });

  const app = {
    app: options.provider.app,
    events: {
      on: emitter.on,
      emit: emitter.emit,
    },
  };

  if (options.plugins) {
    buildPlugins(app, options);
  }

  log('🚀 Application successfully started', { type: 'success' });

  return app;
};
