import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from './utils/date';

export interface NixleErrorOptions extends Omit<Error, 'name'> {
  statusCode?: number;
  isInternal?: boolean;
  [key: string]: any;
}

export class NixleError extends Error {
  constructor({ message, statusCode, ...options }: NixleErrorOptions) {
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
    throw new NixleError({ message: options });
  } else {
    throw new NixleError(options);
  }
}

export const isNixleError = (error: any): error is NixleError => {
  return error instanceof NixleError;
};
