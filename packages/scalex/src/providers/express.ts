import { type Express } from 'express';
import { type Provider, type ApiMethods, type MethodHandler } from '../createApp';
import { type HTTPMethod } from '../utils/HTTPMethod';

export const expressProvider = (app: Express): Provider<Express> => {
  const createMethod =
    (method: Lowercase<HTTPMethod>): MethodHandler =>
    (path, handler) =>
      app[method](path, async (req, res) => {
        res.setHeader('x-powered-by', 'ScaleX');
        res.send(await handler({ req, res, setStatusCode: res.status }));
      });

  const methods: ApiMethods = {
    get: createMethod('get'),
    post: createMethod('post'),
    patch: createMethod('patch'),
    put: createMethod('put'),
    delete: createMethod('delete'),
  };

  return {
    methods,
    server: app,
  };
};
