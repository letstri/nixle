export interface NixleErrorOptions extends Omit<Error, 'name'> {
    statusCode?: number;
    isInternal?: boolean;
    [key: string]: any;
}
export declare class NixleError extends Error {
    constructor({ message, statusCode, ...options }: NixleErrorOptions);
    time: string;
    statusCode: number;
    isInternal: boolean;
}
export declare function createInternalError(options: string | NixleErrorOptions): never;
export declare function createError(options: string | NixleErrorOptions): never;
export declare const isNixleError: (error: any) => error is NixleError;
