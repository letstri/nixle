import type { AppOptions } from '~/createApp';
import { buildRoutes } from '~/router/buildRoutes';
import { fixPath } from '~/utils/fixPath';

export const buildModules = (options: AppOptions) => {
  options.modules.forEach((module) => {
    module.routers.forEach(([routerPath, routes]) => {
      const prefix = options.globalPrefix ? fixPath(options.globalPrefix) : '';

      buildRoutes(options, prefix + fixPath(routerPath), routes);
    });
  });
};
