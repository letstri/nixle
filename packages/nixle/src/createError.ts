import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from './utils/date';
import { log } from './services/logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './services/emmiter';

export interface NixleErrorOptions extends Omit<Error, 'name'> {
  statusCode?: number;
  [key: string]: any;
}

export class NixleError extends Error {
  constructor({ message, statusCode, ...options }: NixleErrorOptions & { isInternal: boolean }) {
    super(message);
    this.name = 'NixleError';
    this.statusCode = statusCode || 400;
    Object.assign(this, options);
    Error.captureStackTrace(this, this.constructor);
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

export const logAndFormatError = (error: any) => {
  emitter.emit('error', error);
  if (isNixleError(error)) {
    log((error.isInternal && error.stack) || error.message, { type: 'error' });
  } else if (error instanceof Error) {
    log(error.stack || error.message, { type: 'error' });
  } else if (isPrimitive(error)) {
    log(error, { type: 'error' });
  } else {
    log(`${error.constructor.name} ${JSON.stringify(error)}`, { type: 'error' });
  }

  const removeProperties = ['name', 'stack', 'message', 'statusCode', 'time', 'isInternal'];
  const json = {
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error',
    time: error.time || dayjs().format(DEFAULT_DATE_FORMAT),
  };

  if (error instanceof Error) {
    Object.assign(
      json,
      omit(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))), removeProperties),
    );
  }

  return json;
};
