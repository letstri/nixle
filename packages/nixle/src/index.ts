declare global {
  var __NIXLE: {
    loggerInstance?: import('consola').ConsolaInstance;
    routerOptions?: Nixle.RouterOptions;
    serviceOptions?: Nixle.ServiceOptions;
    env?: Nixle.Env;
  };

  namespace Nixle {
    interface Provider {}
    interface Request {}
    interface Response {}
    interface RouterOptions {}
    interface ServiceOptions {}
    interface Env {
      [key: string]: string | undefined;
    }
  }
}

globalThis.__NIXLE = globalThis.__NIXLE || {};

export type { HTTPMethod } from '~/types/HTTPMethod';
export type { CookieOptions } from '~/types/CookieOptions';
export { StatusCode } from '~/types/StatusCode';
export { createApp, type NixleApp } from './createApp';
export * from './router';
export { createService } from './service/createService';
export * from './createGuard';
export { createProvider, type Provider } from './provider/createProvider';
export { createError, isNixleError } from './createError';
export { createPlugin } from './plugins/createPlugin';
