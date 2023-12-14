import { StatusCode } from 'nixle';
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
            zodObject: <T extends _zod.ZodRawShape>(shape: T | ((zod: typeof _zod.z) => T), options?: ZodOptions) => Promise<T>;
        }
    }
}
export declare const zodObject: <T extends _zod.ZodRawShape>(shape: T | ((zod: typeof _zod.z) => T), options?: ZodOptions) => Promise<{ [k_1 in keyof _zod.objectUtil.addQuestionMarks<_zod.baseObjectOutputType<T>, { [k in keyof _zod.baseObjectOutputType<T>]: undefined extends _zod.baseObjectOutputType<T>[k] ? never : k; }[keyof T]>]: _zod.objectUtil.addQuestionMarks<_zod.baseObjectOutputType<T>, { [k_2 in keyof _zod.baseObjectOutputType<T>]: undefined extends _zod.baseObjectOutputType<T>[k_2] ? never : k_2; }[keyof T]>[k_1]; }>;
export declare const zodPlugin: import("nixle/dist/plugins/createPlugin").Plugin;
export {};
