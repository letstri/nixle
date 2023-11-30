import { createConsola, type ConsolaOptions, type LogType } from 'consola';
import { colorize } from 'consola/utils';
import { createInternalError } from '~/createError';

let loggerInstance = createConsola();

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
export const log = (message: string, options?: { type?: LogType }) => {
  const type = options?.type || 'log';
  const nixleMessage = `${colorize('bgBlue', ' Nixle ')}`;

  const method = loggerInstance?.[type || 'log'];

  if (!method) {
    createInternalError(`Logger method "${type}" not found`);
  }

  method(`${nixleMessage} ${message}`);
};
