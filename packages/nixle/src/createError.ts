import dayjs from 'dayjs';
import { colorize } from 'consola/utils';
import { log } from './logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './emmiter';
import { StatusCode } from '.';

export interface NixleError<D> {
  time: string;
  statusCode: number;
  message: string;
  details?: D;
}

const errorSymbol = Symbol('NixleError');

export function createError(
  options:
    | string
    | {
        message: string;
        statusCode?: number;
        details?: Record<string, unknown>;
      },
): never {
  const message = typeof options === 'string' ? options : options.message;

  throw {
    message,
    statusCode:
      typeof options === 'string'
        ? StatusCode.INTERNAL_SERVER_ERROR
        : options.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
    time: dayjs().format(),
    details: typeof options === 'string' ? {} : options.details,
    __symbol: errorSymbol,
  } satisfies NixleError<unknown> & { __symbol: typeof errorSymbol };
}

export const isNixleError = (error: any): error is NixleError<unknown> => {
  return error?.__symbol === errorSymbol;
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

  _log(colorize('red', message), { type: 'error' });

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

  const json: NixleError<unknown> = {
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
