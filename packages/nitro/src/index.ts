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
  return {
    app,
    globalMiddleware: (middleware) =>
      app.router.use(
        '*',
        eventHandler(async (event) => {
          await middleware({
            url: event.node.req.url!,
            method: event.method as HTTPMethod,
            setHeader: (key, value) => event.headers.set(key, value),
            getHeader: (key) => event.headers.get(key),
            headers: Object.fromEntries(
              Object.entries(getRequestHeaders(event)).filter(([, v]) => v),
            ) as Record<string, string>,
          });
        }),
      ),
    createRoute: ({ method, path, middleware, handler }) =>
      app.router.use(
        path,
        eventHandler(async (event) => {
          const handlerContext: RouteHandlerContext = {
            request: event.node.req,
            response: event.node.res,
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
          };
          await middleware(handlerContext);

          return handler(handlerContext);
        }),
        method,
      ),
  };
});
