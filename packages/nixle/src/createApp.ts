import type { ConsolaOptions } from 'consola';
import { createLogger, log } from './logger';
import type dotenv from 'dotenv';

import type { Provider } from './provider/createProvider';
import { createError, logError } from './createError';
import { hooks } from './hooks';
import type { Plugin } from './plugins/createPlugin';
import { buildPlugins } from './plugins/buildPlugins';
import { buildEnv } from './env';
import { StatusCode, type Router } from '.';
import { buildRouter } from './router/buildRouter';
import { validatePath } from './utils/validations';
import { pick } from './utils/helpers';
import { createMiddleware, type Middleware } from './createMiddleware';
import type { Module } from './createModule';

type ConvertModules<M extends Module[]> = M[number]['routers'];

type ConvertRouters<R extends Router[]> = {
  [P in R[number]['path']]: Extract<R[number], { path: P }>['$inferRoutes'];
};

export interface AppOptions<
  Modules extends Module[] = Module[],
  Routers extends Router[] = Router[],
  P = any,
> {
  provider: Provider<P>;
  routers?: Routers;
  modules?: Modules;
  plugins?: Plugin[];
  middlewares?: Middleware[];
  logger?: Partial<ConsolaOptions> | false;
  env?: dotenv.DotenvConfigOptions;
  globalPrefix?: string;
}

export type NixleApp = ReturnType<typeof createApp>;

export function createApp<Modules extends Module[] = Module[], Routers extends Router[] = Router[]>(
  options: AppOptions<Modules, Routers>,
) {
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
    if (
      (!options.routers && !options.modules) ||
      (options.routers?.length === 0 && options.modules?.length === 0)
    ) {
      throw createError('At least one router is required', StatusCode.INTERNAL_SERVER_ERROR);
    }
  } catch (e) {
    logError(e, log);
    process.exit(1);
  }

  buildEnv(options.env);

  if (options.plugins) {
    buildPlugins(options.provider, options);
  }

  options.middlewares = [
    createMiddleware('nixle-global-middleware', ({ setHeader }) => {
      setHeader('X-Powered-By', 'Nixle');
    }),
    ...(options.middlewares || []),
  ];

  options.modules?.forEach((module) => {
    module.routers.forEach((router) => {
      buildRouter(options, router);
    });
  });

  options.routers?.forEach((router) => {
    buildRouter(options, router);
  });

  const app = {
    app: options.provider.app,
    hooks: pick(hooks, ['afterEach', 'beforeEach', 'callHook', 'hook', 'hookOnce']),
    $inferRouters: {} as ConvertRouters<Routers> & ConvertRouters<ConvertModules<Modules>>,
  };

  log.success('🔥 Application successfully started');

  return app;
}
