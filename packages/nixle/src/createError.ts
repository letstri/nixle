import dayjs from 'dayjs';
import { colorize } from 'consola/utils';
import { DEFAULT_DATE_FORMAT } from './utils/date';
import { log } from './logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './emmiter';
import { StatusCode } from '.';

export interface NixleErrorOptions {
  message: string;
  statusCode?: number;
}

export interface ErrorResponse<D> {
  time: string;
  statusCode: number;
  message: string;
  details?: D;
}

export class NixleError extends Error implements ErrorResponse<unknown> {
  constructor({
    message,
    statusCode,
    isInternal = false,
    ...options
  }: NixleErrorOptions & { isInternal?: boolean }) {
    super(message);
    this.name = 'NixleError';
    this.statusCode = statusCode || StatusCode.BAD_REQUEST;
    Object.assign(this, options);
  }

  time = dayjs().format(DEFAULT_DATE_FORMAT);
  statusCode = StatusCode.BAD_REQUEST;
  isInternal = false;
  details = {};
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
    throw new NixleError({ message: options });
  } else {
    throw new NixleError(options);
  }
}

export const isNixleError = (error: any): error is NixleError => {
  return error instanceof NixleError;
};

export const logError = (error: any, _log: typeof log) => {
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

  _log(colorize('red', message), { type: 'error' });

  emitter.emit('error', error);
};

export const formatError = (error: any, statusCode = StatusCode.INTERNAL_SERVER_ERROR) => {
  const removeProperties = ['name', 'stack', 'message', 'statusCode', 'time', 'isInternal'];
  const defaultTime = dayjs().format(DEFAULT_DATE_FORMAT);
  const json: ErrorResponse<any> = isPrimitive(error)
    ? {
        statusCode,
        message: String(error),
        time: defaultTime,
        details: error,
      }
    : {
        statusCode: (error.statusCode as number) || statusCode,
        message: (error.message as string) || 'Internal Server Error',
        time: (error.time as string) || defaultTime,
        details: error,
      };

  if (error instanceof Error) {
    json.details = omit(
      JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
      removeProperties,
    );
  }

  return json;
};
