import { type ConsolaOptions } from 'consola';
import { type ColorName } from 'consola/utils';
export declare const createLogger: (options: Partial<ConsolaOptions>) => void;
/**
 * @description Log message
 *
 * @param {string} message
 *
 * @example log.info('Hello world')
 */
export declare const log: {
    info: (...messages: any[]) => void;
    success: (...messages: any[]) => void;
    warn: (...messages: any[]) => void;
    error: (...messages: any[]) => void;
    fatal: (...messages: any[]) => void;
    debug: (...messages: any[]) => void;
    trace: (...messages: any[]) => void;
    silent: (...messages: any[]) => void;
    log: (...messages: any[]) => void;
    fail: (...messages: any[]) => void;
    verbose: (...messages: any[]) => void;
};
export declare const contextLog: (context: string, color?: ColorName) => typeof log;
