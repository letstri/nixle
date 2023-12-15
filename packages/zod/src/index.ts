import { StatusCode, createError, createPlugin } from 'nixle';
import * as _zod from 'zod';

interface Options {
  /**
   * The message to use when throwing an error.
   *
   * @default 'Validation error'
   */
  message?: string;
  /**
   * The status code to use when throwing an error.
   *
   * @default StatusCode.BAD_REQUEST
   */
  statusCode?: StatusCode;
}

interface ZodObject {
  <T extends _zod.ZodRawShape>(shape: T | ((zod: typeof _zod.z) => T), options?: Options): (
    data: any,
  ) => Promise<_zod.infer<_zod.ZodObject<T>>>;
}

declare global {
  namespace Nixle {
    interface ServiceOptions {
      zodObject: ZodObject;
    }

    interface RouterOptions {
      zodObject: ZodObject;
    }
  }
}

/**
 * @param shape
 *
 * @example
 * const usersRouter = createRouter('/users', ({ zodObject }) => [
 *   route.get('/', {
 *     queryValidation: zodObject((zod) => ({
 *       email: zod.string().email(),
 *       password: zod.string().min(8),
 *     })),
 *     handler: ({ query }) => 'Hello Users!',
 *   }),
 * ]);
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 *
 * zodObject((zod) => ({
 *   email: zod.string().email(),
 *   password: zod.string().min(8),
 * }))
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 * import * as zod from 'zod';
 *
 * zodObject({
 *   email: zod.string().email(),
 *   password: zod.string().min(8),
 * })
 *
 * @param options
 * @returns (data: any) => ValidatedData
 */
export const zodObject: ZodObject = (shape, options) => {
  const obj = _zod.object(typeof shape === 'function' ? shape(_zod.z) : shape);

  return async (data: any) => {
    try {
      return await obj.parseAsync(data);
    } catch (e) {
      const error = e as _zod.ZodError;

      createError({
        message: options?.message || 'Validation error',
        statusCode: options?.statusCode || StatusCode.BAD_REQUEST,
        details: error.errors.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path.join('.')]: curr.message,
          }),
          {},
        ),
      });
    }
  };
};

export const zodPlugin = createPlugin('zod', ({ extendServiceOptions, extendRouterOptions }) => {
  extendServiceOptions({ zodObject });
  extendRouterOptions({ zodObject });
});
