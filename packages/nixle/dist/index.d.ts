declare global {
    namespace Nixle {
        interface RouterContext {
        }
        interface ServiceContext {
        }
        interface Env {
            [key: string]: string | undefined;
        }
    }
}
export type { HTTPMethod } from './types/HTTPMethod';
export type { CookieOptions } from './types/CookieOptions';
export { StatusCode } from './types/StatusCode';
export { createApp, type NixleApp } from './createApp';
export * from './router';
export * from './createService';
export * from './createGuard';
export * from './createMiddleware';
export * from './provider/createProvider';
export * from './plugins/createPlugin';
export { createError, isNixleError, type ErrorOptions } from './createError';
