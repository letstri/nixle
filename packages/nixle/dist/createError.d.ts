export interface NixleErrorOptions {
    message: string;
    statusCode?: number;
}
export declare class NixleError extends Error {
    constructor({ message, statusCode, ...options }: NixleErrorOptions & {
        isInternal: boolean;
    });
    time: string;
    statusCode: number;
    isInternal: boolean;
}
export declare function createInternalError(options: string | NixleErrorOptions): never;
export declare function createError(options: string | NixleErrorOptions): never;
export declare const isNixleError: (error: any) => error is NixleError;
export declare const logError: (error: any) => void;
export declare const formatError: (error: any) => {
    statusCode: number;
    message: string;
    time: string;
};
