import type { AppOptions } from '~/createApp';
import { buildRoutes } from '~/router/buildRoutes';
import { joinPath } from '~/utils/helpers';

export const buildModules = (options: AppOptions) => {
  options.modules.forEach((module) => {
    module.options.routers.forEach(({ path, routes }) => {
      buildRoutes(options, joinPath(options.globalPrefix || '', path || ''), routes());
    });
  });
};
