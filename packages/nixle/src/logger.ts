import { createConsola, type ConsolaOptions, type LogType, type ConsolaInstance } from 'consola';
import { colorize, type ColorName } from 'consola/utils';
import { createError } from '~/createError';

interface LogOptions {
  type?: LogType;
}

export const createLogger = (options: Partial<ConsolaOptions>) => {
  __NIXLE.loggerInstance = createConsola(options);
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
export const log = (message: any, options?: LogOptions) => {
  if (!__NIXLE.loggerInstance) {
    return;
  }

  const type = options?.type || 'log';
  const nixleMessage = `${colorize('bgBlue', ' Nixle ')}`;

  const method = __NIXLE.loggerInstance[type || 'log'];

  if (!method) {
    createError(`Logger method "${type}" not found`);
  }

  method(`${nixleMessage}`, ...(Array.isArray(message) ? message : [message]));
};

export const contextLog =
  (context: string, color: ColorName = 'bgWhite'): typeof log =>
  (message, options?: LogOptions) =>
    log(
      [colorize(color, ` ${context} `), ...(Array.isArray(message) ? message : [message])],
      options,
    );
