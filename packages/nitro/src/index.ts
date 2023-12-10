import type { IncomingMessage, ServerResponse } from 'http';
import {
  setCookie,
  getCookie,
  getQuery,
  eventHandler,
  readRawBody,
  H3Event,
  type EventHandlerRequest,
  getRequestHeaders,
  getRouterParams,
  setResponseStatus,
} from 'h3';
import type { NitroApp } from 'nitropack';
import { createProvider, type HTTPMethod, type RouteHandlerContext } from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends NitroApp {}
    interface Request extends IncomingMessage {}
    interface Response extends ServerResponse<IncomingMessage> {}
  }
}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const nitroProvider = createProvider((app) => {
  const formatHandler = async (
    event: H3Event<EventHandlerRequest>,
  ): Promise<RouteHandlerContext> => ({
    request: event.node.req,
    response: event.node.res,
    url: event.node.req.url || '',
    method: event.method as HTTPMethod,
    params: getRouterParams(event),
    query: getQuery(event),
    body: await readRawBody(event),
    setStatusCode: (code) => setResponseStatus(event, code),
    setHeader: (key, value) => event.headers.set(key, value),
    getHeader: (key) => event.headers.get(key),
    headers: Object.fromEntries(
      Object.entries(getRequestHeaders(event)).filter(([, v]) => v),
    ) as Record<string, string>,
    setCookie: (name, value, options) =>
      setCookie(event, name, value, {
        ...options,
        sameSite: sameSiteMap.get(options?.sameSite || 'Strict') || 'strict',
      }),
    getCookie: (name) => getCookie(event, name) || null,
  });

  return {
    app,
    createMiddleware: (handler) =>
      app.router.use(
        '*',
        eventHandler(async (event) => {
          const response = await handler(await formatHandler(event));

          if (response) {
            return response;
          }
        }),
      ),
    createRoute: ({ method, path, middleware, handler }) =>
      app.router.use(
        path,
        eventHandler(async (event) => {
          if (middleware) {
            const response = await middleware(await formatHandler(event));

            if (response) {
              return response;
            }
          }

          return handler(await formatHandler(event));
        }),
        method,
      ),
  };
});
