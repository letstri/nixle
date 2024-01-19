import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './logger';
import type dotenv from 'dotenv';

import type { Provider } from './provider/createProvider';
import { createError, logError } from './createError';
import { emitter } from './emmiter';
import type { Plugin } from './plugins/createPlugin';
import { buildPlugins } from './plugins/buildPlugins';
import { buildEnv } from './env';
import { StatusCode, type Router } from '.';
import { buildRouter } from './router/buildRouter';
import { validatePath } from './utils/validations';

type ConvertRouters<T extends Router[]> = {
  [P in T[number]['path']]: Extract<T[number], { path: P }>['$inferRoutes'];
};

export interface AppOptions<Routers extends Router[] = Router[]> {
  provider: Provider;
  routers: Routers;
  plugins?: Plugin[];
  logger?: Partial<ConsolaOptions> | false;
  env?: dotenv.DotenvConfigOptions;
  globalPrefix?: string;
}

export type NixleApp = ReturnType<typeof createApp>;

export function createApp<Routers extends Router[] = Router[]>(options: AppOptions<Routers>) {
  if (options.globalPrefix) {
    validatePath(options.globalPrefix);
  }

  if (options.logger !== false) {
    createLogger(options.logger || {});
  }

  try {
    if (!options.provider) {
      throw createError('Provider is required', StatusCode.INTERNAL_SERVER_ERROR);
    }
    if (options.routers.length === 0) {
      throw createError('At least one router is required', StatusCode.INTERNAL_SERVER_ERROR);
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
    $inferRouters: {} as ConvertRouters<Routers>,
  };

  log.success('🔥 Application successfully started');

  return app;
}
