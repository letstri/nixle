import type { Provider } from '../createProvider';
import type { HTTPMethod } from '../utils/HTTPMethod';
import type { Routes } from './createRouter';
import { fixPath } from '../utils/fixPath';
import { log } from '~/logger/logger';

export const buildRoutes = <Server>(
  provider: Provider<Server>,
  routerPath: string,
  routes: Routes,
) => {
  routes({ log }).forEach((route) => {
    const method = route.method ? (route.method.toLowerCase() as Lowercase<HTTPMethod>) : 'get';
    const routePath = fixPath(routerPath) + fixPath(route.path);

    provider.request(method, routePath, (params) => {
      params.setHeader('x-powered-by', 'Nixle');

      if (route.statusCode) {
        params.setStatusCode(route.statusCode);
      }

      return route.handler({ req: params.req, res: params.res });
    });
  });
};
