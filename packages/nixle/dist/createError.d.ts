import { log } from './logger';
import { StatusCode } from '.';
export interface ErrorOptions<D extends unknown = unknown> {
    /**
     * @example 'User with id 1 not found'
     */
    message: string;
    /**
     * @default 400 // Bad Request
     *
     * @example StatusCode.BAD_REQUEST
     */
    statusCode?: number;
    /**
     * @example user_not_found
     */
    code?: string | number;
    /**
     * Should be an object
     *
     * @example { id: 1 }
     */
    details?: D;
}
export declare class NixleError<D extends unknown = unknown> extends Error {
    constructor({ statusCode, message, details, code }: ErrorOptions<D>);
    time: string;
    statusCode: StatusCode;
    message: string;
    details?: D;
    code?: string | number;
}
export declare function createError<D extends unknown>(options: ErrorOptions<D>): NixleError<D>;
export declare function createError<D extends unknown = never>(message: string, statusCode?: StatusCode): NixleError<D>;
export declare const isNixleError: (error: any) => error is NixleError<unknown>;
export declare const logError: (error: any, _log: typeof log) => Promise<void>;
export declare const transformErrorToResponse: (error: any, statusCode: StatusCode) => Omit<Pick<NixleError<unknown>, keyof NixleError<unknown>>, "name">;
