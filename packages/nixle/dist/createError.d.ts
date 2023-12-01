export interface NixleErrorOptions extends Omit<Error, 'name'> {
    statusCode?: number;
    [key: string]: any;
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
export declare const logAndFormatError: (error: any) => {
    statusCode: any;
    message: any;
    time: any;
};
