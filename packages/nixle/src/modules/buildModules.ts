import type { AppOptions } from '~/createApp';
import { buildRoutes } from '~/router/buildRoutes';

export const buildModules = <Server>(options: AppOptions<Server>) => {
  options.modules.forEach((module) => {
    module.routers.forEach(([routerPath, routes]) => {
      buildRoutes(options, routerPath, routes);
    });
  });
};
