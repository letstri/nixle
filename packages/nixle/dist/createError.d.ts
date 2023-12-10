import { log } from './logger';
export interface NixleErrorOptions {
    message: string;
    statusCode?: number;
}
export interface ErrorResponse<D> {
    time: string;
    statusCode: number;
    message: string;
    details?: D;
}
export declare class NixleError extends Error implements ErrorResponse<unknown> {
    constructor({ message, statusCode, isInternal, ...options }: NixleErrorOptions & {
        isInternal?: boolean;
    });
    time: string;
    statusCode: number;
    isInternal: boolean;
    details: {};
}
export declare function createInternalError(options: string | NixleErrorOptions): never;
export declare function createError(options: string | NixleErrorOptions): never;
export declare const isNixleError: (error: any) => error is NixleError;
export declare const logError: (error: any, _log: typeof log) => void;
export declare const formatError: (error: any, statusCode?: number) => ErrorResponse<any>;
