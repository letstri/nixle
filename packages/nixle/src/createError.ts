import dayjs from 'dayjs';
import { colorize } from 'consola/utils';
import { log } from './logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './emmiter';
import { StatusCode } from '.';

export class NixleError<D = any> extends Error {
  constructor({
    statusCode,
    message,
    details,
  }: {
    statusCode: StatusCode;
    message: string;
    details?: D;
  }) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NixleError';
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }

  time = dayjs().format();
  statusCode = StatusCode.BAD_REQUEST;
  message = 'Internal Server Error';
  details?: D;
}

export function createError(options: {
  message: string;
  statusCode?: number;
  details?: any;
}): never;
export function createError(message: string, statusCode?: StatusCode): never;

export function createError(
  optionsOrMessage:
    | string
    | {
        message: string;
        statusCode?: number;
        details?: any;
      },
  statusCode?: StatusCode,
): never {
  const message =
    typeof optionsOrMessage === 'string' ? optionsOrMessage : optionsOrMessage.message;

  throw new NixleError({
    message,
    statusCode:
      typeof optionsOrMessage === 'string'
        ? statusCode || StatusCode.BAD_REQUEST
        : optionsOrMessage.statusCode || StatusCode.BAD_REQUEST,
    details: typeof optionsOrMessage === 'string' ? {} : optionsOrMessage.details || {},
  });
}

export const isNixleError = (error: any): error is NixleError => {
  return error instanceof NixleError;
};

export const logError = (error: any, _log: typeof log) => {
  let message = '';

  if (isNixleError(error) || error instanceof Error) {
    message = error.message;
  } else if (isPrimitive(error)) {
    message = error;
  } else {
    message = `${error.constructor.name} ${JSON.stringify(error)}`;
  }

  if (error && (!error.statusCode || error.statusCode === StatusCode.INTERNAL_SERVER_ERROR)) {
    _log.fatal(colorize('red', message), error.stack);
  } else {
    _log.error(colorize('red', message));
  }

  emitter.emit('error', error);
};

export const transformErrorToResponse = (error: any, statusCode: StatusCode) => {
  const defaultTime = dayjs().format();
  const isPrimitiveError = isPrimitive(error);

  const _message = (isPrimitiveError && error) || error.message || 'Internal Server Error';
  const _time = (isPrimitiveError && defaultTime) || error.time || defaultTime;
  const _details = (isPrimitiveError && {}) || error.details || {};

  const json: Omit<Pick<NixleError, keyof NixleError>, 'name'> = {
    statusCode,
    message: _message,
    time: _time,
    details: _details,
  };

  json.details = {
    ...json.details,
    ...omit(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))), [
      'message',
      'name',
      'stack',
      'statusCode',
      'time',
      'details',
    ]),
  };

  return json;
};
