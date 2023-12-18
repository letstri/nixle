import { createConsola, type ConsolaOptions, type LogType } from 'consola';
import { colorize, type ColorName } from 'consola/utils';
import { createError } from '~/createError';

export const createLogger = (options: Partial<ConsolaOptions>) => {
  __NIXLE.loggerInstance = createConsola(options);
};

const _log = (type: LogType, ...messages: any[]) => {
  if (!__NIXLE.loggerInstance) {
    return;
  }

  const nixleMessage = `${colorize('bgBlue', ' Nixle ')}`;

  const method = __NIXLE.loggerInstance[type];

  if (!method) {
    createError(`Logger method "${type}" not found`);
  }

  method(`${nixleMessage}`, ...messages);
};

/**
 * @description Log message
 *
 * @param {string} message
 *
 * @example log.info('Hello world')
 */
export const log = {
  info: (...messages: any[]) => _log('info', ...messages),
  success: (...messages: any[]) => _log('success', ...messages),
  warn: (...messages: any[]) => _log('warn', ...messages),
  error: (...messages: any[]) => _log('error', ...messages),
  fatal: (...messages: any[]) => _log('fatal', ...messages),
  debug: (...messages: any[]) => _log('debug', ...messages),
  trace: (...messages: any[]) => _log('trace', ...messages),
  silent: (...messages: any[]) => _log('silent', ...messages),
  log: (...messages: any[]) => _log('log', ...messages),
  fail: (...messages: any[]) => _log('fail', ...messages),
  verbose: (...messages: any[]) => _log('verbose', ...messages),
} satisfies Record<Exclude<LogType, 'box' | 'start' | 'ready'>, (message: string) => void>;

export const contextLog = (context: string, color: ColorName = 'bgWhite'): typeof log =>
  Object.fromEntries(
    Object.entries(log).map(([name, log]) => [
      name,
      (...messages: any[]) => log(colorize(color, ` ${context} `), ...messages),
    ]),
  ) as typeof log;
