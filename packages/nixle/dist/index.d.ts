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
export { createService } from './service/createService';
export * from './createGuard';
export { createProvider, type Provider } from './provider/createProvider';
export { createError, isNixleError } from './createError';
export { createPlugin } from './plugins/createPlugin';
