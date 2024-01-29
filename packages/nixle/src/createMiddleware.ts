import { createError, StatusCode, type RouteHandlerContext } from '.';
import type { NixleError } from './createError';
import { contextLog, type log } from './logger';

export interface MiddlewareFunction {
  (context: RouteHandlerContext & { log: typeof log }): Promise<void> | void;
}

export interface Middleware {
  (context: RouteHandlerContext): Promise<void>;
}

export function createMiddleware<N extends string>(
  name: Lowercase<N>,
  middleware: MiddlewareFunction,
): Middleware {
  return async (context) => {
    try {
      await middleware({ ...context, log: contextLog(name.toLowerCase(), 'bgYellowBright') });
    } catch (e) {
      throw createError({
        message:
          (e as NixleError)?.message || `Oops, middleware "${name.toLowerCase()}" was failed`,
        statusCode: (e as NixleError)?.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
        details: (e as NixleError)?.details,
      });
    }
  };
}
