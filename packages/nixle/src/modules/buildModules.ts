import type { AppOptions } from '~/createApp';
import { buildRoutes } from '~/router/buildRoutes';

export const buildModules = (options: AppOptions) => {
  options.modules.forEach((module) => {
    module.options.routers.forEach((router) => {
      buildRoutes(options, router);
    });
  });
};
