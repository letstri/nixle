import type { Provider } from '~/createProvider';
import type { HTTPMethod } from '~/utils/HTTPMethod';
import { fixPath } from '~/utils/fixPath';
import { log } from '~/logger/logger';
import type { Routes } from './createRouter';
import dayjs from 'dayjs';
import { isPrimitive, omit } from '~/utils/helpers';
import { DEFAULT_DATE_FORMAT } from '~/utils/date';
import { isNixleError } from '~/createError';

export const logAndFormatError = (error: any) => {
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

export const buildRoutes = <Server>(
  provider: Provider<Server>,
  routerPath: string,
  routes: Routes,
) => {
  routes({ log }).forEach((route) => {
    const method = route.method ? (route.method.toLowerCase() as Lowercase<HTTPMethod>) : 'get';
    const routePath = fixPath(routerPath) + fixPath(route.path);

    provider.request(method, routePath, async (params) => {
      params.setHeader('x-powered-by', 'Nixle');

      if (route.statusCode) {
        params.setStatusCode(route.statusCode);
      }

      try {
        return await route.handler(params);
      } catch (error) {
        throw logAndFormatError(error);
      }
    });
  });
};
