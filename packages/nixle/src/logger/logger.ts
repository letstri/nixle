import picocolors from 'picocolors';
import { createConsola, type ConsolaOptions, type LogType } from 'consola';
import { createInternalError } from '~/createError';

export let loggerInstance = createConsola();

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
  const nixleMessage = `${picocolors.bgBlue(' Nixle ')}`;

  const method = loggerInstance?.[type || 'log'];

  if (!method) {
    createInternalError(`Logger method "${type}" not found`);
  }

  method(`${nixleMessage} ${message}`);
};
