import { StatusCode } from 'nixle';
import * as _zod from 'zod';
type NonOptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
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
    <O extends {
        [K in string]: any;
    } | void = void, T extends {
        [K in O extends void ? string : NonOptionalKeys<O>]: _zod.ZodTypeAny;
    } = {
        [K in O extends void ? string : NonOptionalKeys<O>]: _zod.ZodTypeAny;
    }>(shape: T | ((zod: typeof _zod.z) => T), options?: Options): {
        validate(data: any): Promise<O extends void ? _zod.infer<_zod.ZodObject<T>> : O>;
        $infer: O extends void ? _zod.infer<_zod.ZodObject<T>> : O;
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
 *
 * @example
 * interface UserCreateInput {
 *   email: string;
 *   password: string;
 * }
 *
 * const { validate } = zodObject<UserCreateInput>((zod) => ({
 *   email: zod.string().email(),
 *   password: zod.string().min(8),
 * }));
 */
export declare const zodObject: ZodObject;
export declare const zodPlugin: import("nixle/dist/plugins/createPlugin").Plugin;
export {};
