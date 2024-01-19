import { StatusCode, createError } from '..';

export function validatePath(path: string) {
  if (!path.startsWith('/')) {
    throw createError('Path must start with /', StatusCode.INTERNAL_SERVER_ERROR);
  }

  if (path.length > 1 && path.endsWith('/')) {
    throw createError('Path must not end with /', StatusCode.INTERNAL_SERVER_ERROR);
  }
}
