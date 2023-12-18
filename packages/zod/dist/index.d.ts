import { StatusCode } from 'nixle';
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
    <T extends {
        [K in string]: _zod.ZodTypeAny;
    }>(shape: T | ((zod: typeof _zod.z) => T), options?: Options): {
        validate(data: any): Promise<_zod.infer<_zod.ZodObject<T>>>;
    };
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
 * const usersRouter = createRouter('/users', {
 *   routes: ({ route, zodObject }) => [
 *     route.get('/', {
 *       bodyValidation: zodObject((zod) => ({
 *         email: zod.string().email(),
 *         password: zod.string().min(8),
 *       })).validate,
 *       handler: ({ body }) => `Hello ${body.email}!`,
 *     }),
 *   ],
 * });
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 *
 * const { validate } = zodObject((zod) => ({
 *   email: zod.string().email(),
 *   password: zod.string().min(8),
 * }))
 *
 * @example
 * import { zodObject } from '@nixle/zod';
 * import * as zod from 'zod';
 *
 * const { validate } = zodObject({
 *   email: zod.string().email(),
 *   password: zod.string().min(8),
 * })
 *
 * @param options
 *
 * @example
 * const { validate } = zodObject((zod) => ({
 *   email: zod.string().email(),
 *   password: zod.string().min(8),
 * }), {
 *   message: 'Custom message',
 *   statusCode: StatusCode.BAD_REQUEST,
 * });
 */
export declare const zodObject: ZodObject;
export declare const zodPlugin: import("nixle/dist/plugins/createPlugin").Plugin;
export {};
