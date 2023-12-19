import { log } from './logger';
import { StatusCode } from '.';
export declare class NixleError<D> extends Error {
    constructor({ statusCode, message, details, }: {
        statusCode: StatusCode;
        message: string;
        details?: D;
    });
    time: string;
    statusCode: StatusCode;
    message: string;
    details?: D;
}
export declare function createError(options: string | {
    message: string;
    statusCode?: number;
    details?: any;
}): never;
export declare const isNixleError: (error: any) => error is NixleError<unknown>;
export declare const logError: (error: any, _log: typeof log) => void;
export declare const transformErrorToResponse: (error: any, statusCode?: StatusCode) => Omit<Pick<NixleError<any>, keyof NixleError<any>>, "name">;
