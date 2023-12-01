import { createConsola, type ConsolaOptions, type LogType, type ConsolaInstance } from 'consola';
import { colorize, type ColorName } from 'consola/utils';
import { createInternalError } from '~/createError';

interface LogOptions {
  type?: LogType;
}

let loggerInstance: ConsolaInstance;

export const createLogger = (options: Partial<ConsolaOptions>) => {
  loggerInstance = createConsola(options);
};

/**
 * @description Log message
 *
 * @param {string} message
 * @param {object} options
 * @param {string} options.type
 *
 * @example log('Hello world', { type: 'info' })
 */
export const log = (message: string, options?: LogOptions) => {
  const type = options?.type || 'log';
  const nixleMessage = `${colorize('bgBlue', ' Nixle ')}`;

  const method = loggerInstance?.[type || 'log'];

  if (!method) {
    createInternalError(`Logger method "${type}" not found`);
  }

  method(`${nixleMessage} ${message}`);
};

export const contextLog =
  (context: string, color: ColorName = 'bgWhite'): typeof log =>
  (message, options) =>
    log(`[${colorize(color, context)}] ${message}`, options);
