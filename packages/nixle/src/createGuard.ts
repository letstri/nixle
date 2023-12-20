import { createError, StatusCode, type RouteHandlerContext } from '.';
import type { NixleError } from './createError';

export interface GuardFunction {
  (context: RouteHandlerContext): Promise<void> | void;
}

export interface Guard {
  (context: RouteHandlerContext): Promise<void>;
}

export const createGuard =
  (name: string, guard: GuardFunction): Guard =>
  async (context: RouteHandlerContext) => {
    try {
      await guard(context);
    } catch (e) {
      createError({
        message: (e as NixleError)?.message || `Oops, ${name} guard was failed`,
        statusCode: (e as NixleError)?.statusCode || StatusCode.BAD_REQUEST,
        details: (e as NixleError)?.details,
      });
    }
  };
