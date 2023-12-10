declare global {
  namespace Nixle {
    interface Provider {}
    interface Request {}
    interface Response {}
    interface RouterOptions {}
    interface ServiceOptions {}
  }
}

export type { HTTPMethod } from '~/types/HTTPMethod';
export type { CookieOptions } from '~/types/CookieOptions';
export { StatusCode } from '~/types/StatusCode';
export { createApp, type NixleApp } from './createApp';
export { createModule, type Module } from './modules/createModule';
export * from './router/createRouter';
export * from './router/createRoute';
export { createService } from './service/createService';
export { createProvider, type Provider } from './provider/createProvider';
export { createError, isNixleError, type ErrorResponse } from './createError';
export { createPlugin } from './plugins/createPlugin';
