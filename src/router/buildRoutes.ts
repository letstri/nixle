import { type Provider } from '../createApp';
import { type HTTPMethod } from '../utils/HTTPMethod';
import { type Routes } from './createRouter';
import { fixPath } from '../utils/fixPath';
import { log } from '~/logger/logger';

export const buildRoutes = <Server>(
  provider: Provider<Server>,
  routerPath: string,
  routes: Routes,
) => {
  routes({ log }).forEach((route) => {
    const method = route.method ? (route.method.toLowerCase() as Lowercase<HTTPMethod>) : 'get';
    const request = provider.methods[method];
    const routePath = fixPath(routerPath) + fixPath(route.path);

    request(routePath, (params) => {
      if (route.statusCode) {
        params.setStatusCode(route.statusCode);
      }

      return route.handler(params);
    });
  });
};
