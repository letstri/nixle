import { type ConsolaOptions, type LogType } from 'consola';
export declare let loggerInstance: import("consola/core").ConsolaInstance;
export declare const createLogger: (options: Partial<ConsolaOptions>) => void;
/**
 * @description Log message
 *
 * @param {string} message
 * @param {object} options
 * @param {string} options.type
 *
 * @example log('Hello world', { type: 'info' })
 */
export declare const log: (message: string, options?: {
    type?: LogType;
}) => void;
