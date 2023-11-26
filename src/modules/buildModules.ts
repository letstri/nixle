import { type Provider } from '~/createApp';
import { buildRoutes } from '~/router/buildRoutes';
import { type Module } from './createModule';

export const buildModules = <Server>(provider: Provider<Server>, modules: Module[]) => {
  modules.forEach((module) => {
    module.routers.forEach(([routerPath, routes]) => {
      buildRoutes(provider, routerPath, routes);
    });
  });
};
