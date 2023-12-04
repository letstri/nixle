import dayjs from 'dayjs';
import { colorize } from 'consola/utils';
import { DEFAULT_DATE_FORMAT } from './utils/date';
import { log } from './logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './emmiter';

export interface NixleErrorOptions {
  message: string;
  statusCode?: number;
}

export class NixleError extends Error {
  constructor({ message, statusCode, ...options }: NixleErrorOptions & { isInternal: boolean }) {
    super(message);
    this.name = 'NixleError';
    this.statusCode = statusCode || 400;
    Object.assign(this, options);
  }

  time = dayjs().format(DEFAULT_DATE_FORMAT);
  statusCode = 400;
  isInternal = false;
}

export function createInternalError(options: string | NixleErrorOptions): never {
  if (typeof options === 'string') {
    throw new NixleError({ message: options, isInternal: true });
  } else {
    throw new NixleError({ ...options, isInternal: true });
  }
}

export function createError(options: string | NixleErrorOptions): never {
  if (typeof options === 'string') {
    throw new NixleError({ message: options, isInternal: false });
  } else {
    throw new NixleError({ ...options, isInternal: false });
  }
}

export const isNixleError = (error: any): error is NixleError => {
  return error instanceof NixleError;
};

export const logError = (error: any) => {
  let message = '';

  if (isNixleError(error)) {
    message = (error.isInternal && error.stack) || error.message;
  } else if (error instanceof Error) {
    message = error.stack || error.message;
  } else if (isPrimitive(error)) {
    message = error;
  } else {
    message = `${error.constructor.name} ${JSON.stringify(error)}`;
  }

  log(colorize('red', message), { type: 'error' });

  emitter.emit('error', error);
};

export const formatError = (error: any) => {
  const removeProperties = ['name', 'stack', 'message', 'statusCode', 'time', 'isInternal'];
  const defaultTime = dayjs().format(DEFAULT_DATE_FORMAT);
  const json = isPrimitive(error)
    ? {
        statusCode: 500,
        message: String(error),
        time: defaultTime,
      }
    : {
        statusCode: (error.statusCode as number) || 500,
        message: (error.message as string) || 'Internal Server Error',
        time: (error.time as string) || defaultTime,
      };

  if (error instanceof Error) {
    Object.assign(
      json,
      omit(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))), removeProperties),
    );
  }

  return json;
};
