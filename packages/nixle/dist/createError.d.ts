import { log } from './logger';
import { StatusCode } from '.';
interface ErrorOptions<D = any> {
    /**
     * @example User with id 1 not found
     */
    message: string;
    /**
     * @default 400 Bad Request
     */
    statusCode?: number;
    /**
     * @example user_not_found
     */
    code?: string | number;
    /**
     * @example { id: 1 }
     */
    details?: D;
}
export declare class NixleError<D = any> extends Error {
    constructor({ statusCode, message, details, code }: ErrorOptions<D>);
    time: string;
    statusCode: StatusCode;
    message: string;
    details?: D;
    code?: string | number;
}
export declare function createError(options: ErrorOptions): NixleError;
export declare function createError(message: string, statusCode?: StatusCode): NixleError;
export declare const isNixleError: (error: any) => error is NixleError<any>;
export declare const logError: (error: any, _log: typeof log) => void;
export declare const transformErrorToResponse: (error: any, statusCode: StatusCode) => Omit<Pick<NixleError<any>, keyof NixleError<any>>, "name">;
export {};
