import { type ErrorOptions } from 'nixle';
import { z } from 'zod';
interface ZodObject {
    <T extends {
        [K in string]: z.ZodTypeAny;
    }>(shape: T | z.ZodObject<T> | ((zod: typeof z) => T | z.ZodObject<T> | z.ZodEffects<z.ZodObject<T>> | z.ZodEffects<z.ZodEffects<z.ZodObject<T>>> | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>> | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>> | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>>>), options?: ErrorOptions): {
        validate(data: any): Promise<z.infer<z.ZodObject<T>>>;
        $infer: z.infer<z.ZodObject<T>>;
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
 *       email: z.string().email(),
 *       password: z.string().min(8),
 *     })
 *     .refine((obj) => obj.email && obj.password),
 * );
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
export declare const zodObject: ZodObject;
export declare const zodPlugin: () => import("nixle").Plugin;
export {};
