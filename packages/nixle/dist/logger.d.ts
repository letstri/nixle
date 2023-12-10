import { type ConsolaOptions, type LogType } from 'consola';
import { type ColorName } from 'consola/utils';
interface LogOptions {
    type?: LogType;
}
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
export declare const log: (message: string | string[], options?: LogOptions) => void;
export declare const contextLog: (context: string, color?: ColorName) => typeof log;
export {};
