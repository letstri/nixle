import { StatusCode, createError, createPlugin } from 'nixle';
import * as _zod from 'zod';

interface ZodOptions {
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

declare global {
  namespace Nixle {
    interface ServiceOptions {
      zodObject: <T extends _zod.ZodRawShape>(
        shape: T | ((zod: typeof _zod.z) => T),
        options?: ZodOptions,
      ) => Promise<T>;
    }

    interface RouterOptions {
      zodObject: <T extends _zod.ZodRawShape>(
        shape: T | ((zod: typeof _zod.z) => T),
        options?: ZodOptions,
      ) => Promise<T>;
    }
  }
}

export const zodObject = async <T extends _zod.ZodRawShape>(
  /**
   * The shape to validate against.
   *
   * @example
   * zodObject({
   *   email: zod.string().email(),
   *   password: zod.string().min(8),
   * });
   *
   * @example
   * zodObject((zod) => ({
   *   email: zod.string().email(),
   *   password: zod.string().min(8),
   * }));
   */
  shape: T | ((zod: typeof _zod.z) => T),
  options?: ZodOptions,
) => {
  try {
    return await _zod.object(typeof shape === 'function' ? shape(_zod.z) : shape).parseAsync(shape);
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

export const zodPlugin = createPlugin('zod', ({ extendServiceOptions, extendRouterOptions }) => {
  extendServiceOptions({ zodObject });
  extendRouterOptions({ zodObject });
});
