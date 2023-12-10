import {
  response,
  type Express,
  type Request as ExpressRequest,
  type Response as ExpressResponse,
} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { createProvider, type RouteHandlerContext, type HTTPMethod } from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends Express {}
    interface Request extends ExpressRequest {}
    interface Response extends ExpressResponse {}
  }
}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const expressProvider = createProvider((app) => {
  app.use(cookieParser());
  app.use(bodyParser.json());

  const formatHandler = (
    request: ExpressRequest,
    response: ExpressResponse,
  ): RouteHandlerContext => ({
    request,
    response,
    url: request.url,
    method: request.method as HTTPMethod,
    params: (request.params as Record<string, string>) || {},
    query: (request.query as Record<string, string | string[]>) || {},
    body: request.body,
    setStatusCode: (code) => response.status(code),
    setHeader: (name, value) => response.setHeader(name, value),
    getHeader: (name) => (request.headers[name] ? String(request.headers[name]) : null),
    headers: request.headers as Record<string, string>,
    getCookie: (key) => request.cookies[key] || null,
    setCookie: (key, value, options) =>
      response.cookie(key, value, {
        ...options,
        sameSite: sameSiteMap.get(options?.sameSite || 'Strict') || 'strict',
      }),
  });

  return {
    app,
    createMiddleware: (handler) =>
      app.use('*', async (request, response) => {
        response.send(await handler(formatHandler(request, response)));
      }),
    createRoute: ({ method, path, middleware, handler }) =>
      app[method](path, async (request, response) => {
        if (middleware) {
          const _response = await middleware(formatHandler(request, response));

          if (_response) {
            return _response;
          }
        }

        response.send(await handler(formatHandler(request, response)));
      }),
  };
});
