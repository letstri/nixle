import type { AppOptions } from '~/createApp';
import { buildRoutes } from '~/router/buildRoutes';

export const buildModules = (options: AppOptions) => {
  options.modules.forEach((module) => {
    module.routers.forEach(([routerPath, routes]) => {
      buildRoutes(options, routerPath, routes);
    });
  });
};
