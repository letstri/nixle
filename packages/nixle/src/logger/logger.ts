import dayjs from 'dayjs';
import chalk from 'chalk';

export interface Logger {
  log(message: string): void;
}
export type LoggerType = 'info' | 'success' | 'error' | 'warn';

export let loggerInstance: Logger | null = {
  log: console.log,
};

export const createLogger = (instance: Logger | null) => {
  loggerInstance = instance;
};

export const log = (message: string, options?: { type?: LoggerType }) => {
  const type = options?.type || 'info';
  const startMessage = `🫡 ${chalk.bgBlue(' Nixle ')}`;
  const timeMessage = `${dayjs().format('DD/MM/YYYY, HH:mm')}`;
  const typeMessage = chalk.dim(`[${type.toUpperCase()}]`);
  const chalkType: Record<LoggerType, (message: string) => void> = {
    info: chalk.blue,
    success: chalk.green,
    error: chalk.red,
    warn: chalk.yellow,
  };

  loggerInstance?.log(`${startMessage} ${timeMessage} ${typeMessage} ${chalkType[type](message)}`);
};
