import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './logger';
import type dotenv from 'dotenv';
import { colorize } from 'consola/utils';

import type { Provider } from './provider/createProvider';
import { createError, logError } from './createError';
import { emitter } from './emmiter';
import type { Plugin } from './plugins/createPlugin';
import { buildPlugins } from './plugins/buildPlugins';
import { buildEnv } from './env';
import { StatusCode, type Router } from '.';
import { buildRouter } from './router/buildRouter';

export interface AppOptions {
  provider: Provider;
  routers: Router[];
  plugins?: Plugin[];
  logger?: Partial<ConsolaOptions> | false;
  env?: dotenv.DotenvConfigOptions;
  globalPrefix?: string;
}

export type NixleApp = ReturnType<typeof createApp>;

export function createApp(options: AppOptions) {
  if (options.logger !== false) {
    createLogger(options.logger || {});
  }

  try {
    if (!options.provider) {
      throw createError({
        message: 'Provider is required',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      });
    }
    if (options.routers.length === 0) {
      throw createError({
        message: 'At least one router is required',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  } catch (e) {
    logError(e, log);
    process.exit(1);
  }

  if (options.plugins) {
    buildPlugins(options.provider, options);
  }

  buildEnv(options.env);
  options.routers.forEach((router) => {
    buildRouter(options, router);
  });

  options.provider.globalMiddleware(({ setHeader }) => {
    setHeader('X-Powered-By', 'Nixle');
  });

  const app = {
    app: options.provider.app,
    events: {
      on: emitter.on,
      emit: emitter.emit,
    },
  };

  log.success(`🔥 ${colorize('underline', 'Application successfully started')}`);

  return app;
}
