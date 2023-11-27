import dayjs from 'dayjs';
import picocolors from 'picocolors';

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
  const startMessage = `🫡 ${picocolors.bgBlue(' Nixle ')}`;
  const timeMessage = `${dayjs().format('DD/MM/YYYY, HH:mm')}`;
  const typeMessage = picocolors.dim(`[${type.toUpperCase()}]`);
  const chalkType: Record<LoggerType, (message: string) => void> = {
    info: picocolors.blue,
    success: picocolors.green,
    error: picocolors.red,
    warn: picocolors.yellow,
  };

  loggerInstance?.log(`${startMessage} ${timeMessage} ${typeMessage} ${chalkType[type](message)}`);
};
