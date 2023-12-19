import dayjs from 'dayjs';
import { colorize } from 'consola/utils';
import { log } from './logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './emmiter';
import { StatusCode } from '.';

export class NixleError<D> extends Error {
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
    this.name = 'NixleError';
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }

  time = dayjs().format();
  statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  message = 'Internal Server Error';
  details?: D;
}

export function createError(
  options:
    | string
    | {
        message: string;
        statusCode?: number;
        details?: any;
      },
): never {
  const message = typeof options === 'string' ? options : options.message;

  throw new NixleError({
    message,
    statusCode:
      typeof options === 'string'
        ? StatusCode.INTERNAL_SERVER_ERROR
        : options.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
    details: typeof options === 'string' ? {} : options.details,
  });
}

export const isNixleError = (error: any): error is NixleError<unknown> => {
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

  if (error?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
    _log.fatal(colorize('red', message));
  } else {
    _log.error(colorize('red', message));
  }

  emitter.emit('error', error);
};

export const transformErrorToResponse = (
  error: any,
  statusCode = StatusCode.INTERNAL_SERVER_ERROR,
) => {
  const defaultTime = dayjs().format();
  const isPrimitiveError = isPrimitive(error);

  const _statusCode = (isPrimitiveError && statusCode) || error.statusCode || statusCode;
  const _message = (isPrimitiveError && error) || error.message || 'Internal Server Error';
  const _time = (isPrimitiveError && defaultTime) || error.time || defaultTime;
  const _details = (isPrimitiveError && {}) || error.details || {};

  const json: Omit<Pick<NixleError<any>, keyof NixleError<any>>, 'name'> = {
    statusCode: _statusCode,
    message: _message,
    time: _time,
    details: _details,
  };

  if (error instanceof Error) {
    json.details = omit(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))), [
      'message',
      'name',
      'stack',
    ]);
  }

  return json;
};
