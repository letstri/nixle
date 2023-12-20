import dayjs from 'dayjs';
import createCallsiteRecord from 'callsite-record';
import { colorize } from 'consola/utils';
import { log } from './logger';
import { isPrimitive, omit } from './utils/helpers';
import { emitter } from './emmiter';
import { StatusCode } from '.';

const renderer: any = {
  syntax: {
    string: (...m: string[]) => colorize('green', m.join('')),
    punctuator: (...m: string[]) => colorize('gray', m.join('')),
    keyword: (...m: string[]) => colorize('cyan', m.join('')),
    number: (...m: string[]) => colorize('magenta', m.join('')),
    regex: (...m: string[]) => colorize('magenta', m.join('')),
    comment: (...m: string[]) => colorize('gray', colorize('bold', m.join(''))),
    invalid: (...m: string[]) => colorize('inverse', m.join('')),
  },

  codeFrame: (v: any) => v.slice(1),

  codeLine(num: string, base: string, src: string, isLast: boolean) {
    let prefix = base ? ' > ' : '   ';
    let lineNum = prefix + num + ' ';

    if (base) lineNum = colorize('bgRed', lineNum);

    let line = lineNum + '|' + src;

    if (!isLast) line += '\n';

    return line;
  },

  stackLine(name: string, location: string, isLast: boolean) {
    let line =
      `   ${colorize('dim', 'at')} ` +
      name +
      ' (' +
      colorize('blueBright', colorize('underline', location)) +
      ')';

    if (!isLast) line += '\n';

    return line;
  },

  stack(stack: string) {
    return '\n\n' + stack;
  },
};

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

const formatErrorStack = (error: Error) => {
  const stack = createCallsiteRecord({
    forError: error,
    isCallsiteFrame: (frame) =>
      !!frame.source &&
      !frame.source.includes('node_modules') &&
      !frame.source.includes('node:') &&
      !frame.source.includes('nixle/dist'),
  })?.renderSync({
    renderer,
    stackFilter: (frame) =>
      !!frame.source &&
      !frame.source.includes('node_modules') &&
      !frame.source.includes('node:') &&
      !frame.source.includes('nixle/dist'),
  });

  return stack;
};

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

  if (error && (!error.statusCode || error.statusCode >= StatusCode.INTERNAL_SERVER_ERROR)) {
    if (error instanceof Error) {
      const stack = formatErrorStack(error);

      _log.fatal(colorize('red', message), ...(stack ? ['\n', stack] : []));
    } else {
      _log.fatal(colorize('red', message));
    }
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
