import { type Module } from './createModule';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type MethodHandler = (
  path: string,
  handler: (params: { req: any; res: any }) => Promise<any> | any,
) => Promise<any> | any;
export type ApiMethods = Record<Lowercase<HTTPMethod>, MethodHandler>;

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
        const method = route.method ? (route.method.toLowerCase() as Lowercase<HTTPMethod>) : 'get';

        provider.methods[method](`/${path}` + route.path, route.handler);
      });
    });
  });

  return provider.server;
};
