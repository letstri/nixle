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
    let lineNum = prefix + colorize('dim', num) + ' ';

    if (base) lineNum = colorize('bgRed', lineNum);

    let line = lineNum + colorize('dim', '| ') + src;

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

interface ErrorOptions<D = any> {
  /**
   * @example User with id 1 not found
   */
  message: string;
  /**
   * @default 400 Bad Request
   */
  statusCode?: number;
  /**
   * @example user_not_found
   */
  code?: string | number;
  /**
   * @example { id: 1 }
   */
  details?: D;
}

export class NixleError<D = any> extends Error {
  constructor({ statusCode, message, details, code }: ErrorOptions<D>) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NixleError';
    this.statusCode = statusCode || StatusCode.BAD_REQUEST;
    this.message = message;
    this.details = details;
    this.code = code;
  }

  time = dayjs().format();
  statusCode: StatusCode;
  message = 'Internal Server Error';
  details?: D;
  code?: string | number;
}

const formatErrorStack = (error: Error) => {
  const stack = createCallsiteRecord({
    forError: error,
    isCallsiteFrame: (frame) =>
      isNixleError(error) && error.statusCode < StatusCode.INTERNAL_SERVER_ERROR
        ? !!frame.source &&
          !frame.source.includes('node_modules') &&
          !frame.source.includes('node:') &&
          !frame.source.includes('nixle/dist')
        : true,
  })?.renderSync({
    renderer,
    stackFilter: (frame) =>
      isNixleError(error) && error.statusCode < StatusCode.INTERNAL_SERVER_ERROR
        ? !!frame.source &&
          !frame.source.includes('node_modules') &&
          !frame.source.includes('node:') &&
          !frame.source.includes('nixle/dist')
        : true,
  });

  return stack;
};

export function createError<D>(options: ErrorOptions<D>): NixleError<D>;
export function createError<D = never>(message: string, statusCode?: StatusCode): NixleError<D>;

export function createError<D>(
  optionsOrMessage: string | ErrorOptions<D>,
  statusCode?: StatusCode,
): NixleError<D> {
  const message =
    typeof optionsOrMessage === 'string' ? optionsOrMessage : optionsOrMessage.message;

  return new NixleError<D>({
    message,
    statusCode:
      typeof optionsOrMessage === 'string'
        ? statusCode || StatusCode.BAD_REQUEST
        : optionsOrMessage.statusCode || StatusCode.BAD_REQUEST,
    code: typeof optionsOrMessage === 'string' ? undefined : optionsOrMessage.code,
    details:
      typeof optionsOrMessage === 'string' ? ({} as D) : optionsOrMessage.details || ({} as D),
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
  const _code = (isPrimitiveError && undefined) || error.code;

  const json: Omit<Pick<NixleError, keyof NixleError>, 'name'> = {
    statusCode,
    message: _message,
    time: _time,
    details: _details,
    code: _code,
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
      'code',
    ]),
  };

  return json;
};
