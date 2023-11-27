import { buildRoutes } from '~/router/buildRoutes';
import { type Module } from './createModule';
import type { Provider } from '../createProvider';

export const buildModules = <Server>(provider: Provider<Server>, modules: Module[]) => {
  modules.forEach((module) => {
    module.routers.forEach(([routerPath, routes]) => {
      buildRoutes(provider, routerPath, routes);
    });
  });
};
