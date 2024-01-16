import type { Express, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { createProvider, type HTTPMethod } from 'nixle';

export interface Request extends ExpressRequest {}
export interface Response extends ExpressResponse {}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const expressProvider = createProvider<Express>((app) => {
  app.use(cookieParser());
  app.use(bodyParser.json());

  return {
    app,
    globalMiddleware: (middleware) =>
      app.use(async (request, response, next) => {
        await middleware({
          url: request.url,
          method: request.method as HTTPMethod,
          setHeader: (key, value) => response.setHeader(key, value),
          getHeader: (key) => (request.headers[key] ? String(request.headers[key]) : null),
          headers: request.headers as Record<string, string>,
        });
        next();
      }),
    createRoute: ({ method, path, handler }) =>
      app[method](path, async (request, response) => {
        response.send(
          await handler({
            request,
            response,
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
          }),
        );
      }),
  };
});
