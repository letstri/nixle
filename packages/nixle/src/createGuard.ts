import { createError, StatusCode, type RouteHandlerContext } from '.';
import type { NixleError } from './createError';
import { contextLog, type log } from './logger';

export interface GuardFunction {
  (context: RouteHandlerContext & { log: typeof log }): Promise<void> | void;
}

export interface Guard {
  (context: RouteHandlerContext): Promise<void>;
}

export function createGuard<N extends string>(name: Lowercase<N>, guard: GuardFunction): Guard {
  return async (context) => {
    try {
      await guard({ ...context, log: contextLog(name.toLowerCase(), 'bgGreenBright') });
    } catch (e) {
      throw createError({
        message: (e as NixleError)?.message || `Oops, guard "${name.toLowerCase()}" was failed`,
        statusCode: (e as NixleError)?.statusCode || StatusCode.BAD_REQUEST,
        details: (e as NixleError)?.details,
      });
    }
  };
}
