import { StatusCode, createError, createPlugin, type ErrorOptions, type Logger } from 'nixle';
import { z } from 'zod';

interface ZodObject {
  <T extends { [K in string]: z.ZodTypeAny }>(
    shape:
      | T
      | z.ZodObject<T>
      | ((
          zod: typeof z,
        ) =>
          | T
          | z.ZodObject<T>
          | z.ZodEffects<z.ZodObject<T>>
          | z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>
          | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>
          | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>>
          | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>>>
          | z.ZodEffects<
              z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>>>
            >
          | z.ZodEffects<
              z.ZodEffects<
                z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>>>
              >
            >),
    options?: ErrorOptions,
  ): {
    /**
     * @returns {Promise} Returns a promise with validated object
     * @throws {NixleError} Throws a Nixle error if validation fails
     */
    validate(data: any): Promise<z.infer<z.ZodObject<T>>>;
    /**
     * @returns {Promise} Returns a promise with validated object
     * @throws {NixleError} Throws a Nixle error if validation fails
     */
    validateOptional(data: any): Promise<
      z.infer<
        z.ZodObject<{
          [k in keyof T]: z.ZodOptional<T[k]>;
        }>
      >
    >;
    /**
     * @example
     *
     * const { validate, $infer } = zodObject({
     *   email: z.string().email(),
     *   password: z.string().min(8),
     * });
     *
     * type User = typeof $infer;
     */
    $infer: z.infer<z.ZodObject<T>>;
    /**
     * @example
     *
     * const { validate, $inferOptional } = zodObject({
     *   email: z.string().email(),
     *   password: z.string().min(8),
     * });
     *
     * type User = typeof $inferOptional;
     */
    $inferOptional: z.infer<
      z.ZodObject<{
        [k in keyof T]: z.ZodOptional<T[k]>;
      }>
    >;
  };
}

declare global {
  namespace Nixle {
    interface ServiceContext {
      zodObject: ZodObject;
    }

    interface RouterContext {
      zodObject: ZodObject;
    }
  }
}

/**
 * @param shape
 *
 * @example
 * const usersRouter = createRouter('/users', ({ route, zodObject }) => [
 *   route.get('/', {
 *     bodyValidation: zodObject((zod) => ({
 *       email: zod.string().email(),
 *       password: zod.string().min(8),
 *     })).validate,
 *     handler: ({ body }) => `Hello ${body.email}!`,
 *   }),
 * ]);
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 *
 * const { validate } = zodObject((z) => ({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * }))
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 * import { z } from 'zod';
 *
 * const { validate } = zodObject({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 *
 * const { validate } = zodObject((z) =>
 *   z
 *     .object({
 *       password: z.string().min(8),
 *       oldPassword: z.string().min(8),
 *     })
 *     .refine((obj) => obj.password !== obj.oldPassword),
 * );
 *
 * @example
 *
 * import { zodObject } from '@nixle/zod';
 *
 * const { validateOptional } = zodObject({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * @param options
 *
 * @example
 * const { validate } = zodObject((z) => ({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * }), {
 *   message: 'Custom message',
 *   statusCode: StatusCode.BAD_REQUEST,
 * });
 */
export const zodObject: ZodObject = (shape, options) => {
  const parse = (data: any, { partial }: { partial: boolean }) => {
    if (typeof shape === 'function') {
      const _shape = shape(z);

      if (_shape instanceof z.ZodObject) {
        return partial ? _shape.partial().parseAsync(data) : _shape.parseAsync(data);
      }

      if (_shape instanceof z.ZodEffects) {
        if (partial) {
          console.warn('Partial validation is not supported with ZodEffects');
        }

        return _shape.parseAsync(data);
      }

      return partial
        ? z.object(_shape).partial().parseAsync(data)
        : z.object(_shape).parseAsync(data);
    }

    if (shape instanceof z.ZodObject) {
      return partial ? shape.partial().parseAsync(data) : shape.parseAsync(data);
    }

    return partial ? z.object(shape).partial().parseAsync(data) : z.object(shape).parseAsync(data);
  };

  const tryCatch = async (callback: () => any) => {
    try {
      return await callback();
    } catch (e) {
      const error = e as z.ZodError;

      const paths = error.errors
        .filter(({ path }) => path)
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path.join('.')]: curr.message,
          }),
          {},
        );

      throw createError({
        message: options?.message || 'Validation error',
        statusCode: options?.statusCode || StatusCode.BAD_REQUEST,
        details: {
          ...(paths ? { paths } : { errors: error.errors }),
        },
      });
    }
  };

  const validate = async (data: any) => tryCatch(() => parse(data, { partial: false }));
  const validateOptional = async (data: any) => tryCatch(() => parse(data, { partial: true }));

  return {
    validate,
    validateOptional,
    $infer: {} as any,
    $inferOptional: {} as any,
  };
};

export const zodPlugin = () =>
  createPlugin('zod', ({ extendServiceContext, extendRouterContext }) => {
    extendRouterContext({ zodObject });
    extendServiceContext({ zodObject });
  });
