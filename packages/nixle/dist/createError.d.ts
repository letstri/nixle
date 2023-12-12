import { log } from './logger';
import { StatusCode } from '.';
export interface NixleError<D> {
    time: string;
    statusCode: number;
    message: string;
    details?: D;
    __nixle: typeof errorSymbol;
}
declare const errorSymbol: unique symbol;
export declare function createError(options: string | {
    message: string;
    statusCode?: number;
    details?: Record<string, unknown>;
}): never;
export declare const isNixleError: (error: any) => error is NixleError<unknown>;
export declare const logError: (error: any, _log: typeof log) => void;
export declare const transformErrorToResponse: (error: any, statusCode?: StatusCode) => NixleError<unknown>;
export {};
