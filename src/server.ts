import { type Module } from './modules';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ApiHandler = (
  path: string,
  handler: (params: { req: any; res: any }) => Promise<any> | any,
) => Promise<any> | any;
export type ApiMethods = Record<Lowercase<HTTPMethod>, ApiHandler>;

export const createApp = <Server>(
  provider: {
    methods: ApiMethods;
    server: Server;
  },
  {
    modules,
  }: {
    modules: Module[];
  },
) => {
  modules.forEach((module) => {
    module.routers.forEach(([path, routes]) => {
      routes().forEach((route) => {
        provider.methods[route.method](`/${path}` + route.path, route.handler);
      });
    });
  });

  return provider.server;
};
