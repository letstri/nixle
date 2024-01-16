import type { IncomingMessage, ServerResponse } from 'http';
import {
  setCookie,
  getCookie,
  getQuery,
  eventHandler,
  getRequestHeaders,
  getRouterParams,
  setResponseStatus,
  getRequestURL,
  getHeader,
  setHeader,
  readBody,
} from 'h3';
import type { NitroApp } from 'nitropack';
import { createProvider, type HTTPMethod } from 'nixle';

export interface Request extends IncomingMessage {}
export interface Response extends ServerResponse<IncomingMessage> {}

const sameSiteMap = new Map([
  ['Strict', 'strict' as const],
  ['Lax', 'lax' as const],
  ['None', 'none' as const],
]);

export const nitroProvider = createProvider<NitroApp>((app) => {
  return {
    app,
    globalMiddleware: (middleware) =>
      app.hooks.hook('request', async (event) => {
        await middleware({
          url: getRequestURL(event).href,
          method: event.method as HTTPMethod,
          setHeader: (key, value) => setHeader(event, key, value),
          getHeader: (key) => getHeader(event, key) || null,
          headers: Object.fromEntries(
            Object.entries(getRequestHeaders(event)).filter(([, v]) => v),
          ) as Record<string, string>,
        });
      }),
    createRoute: ({ method, path, handler }) =>
      app.router.use(
        path,
        eventHandler(async (event) => {
          return handler({
            request: event.node.req,
            response: event.node.res,
            method: event.method as HTTPMethod,
            params: getRouterParams(event),
            query: getQuery(event),
            body: ['post', 'put', 'patch'].includes(method) ? await readBody(event) : {},
            setStatusCode: (code) => setResponseStatus(event, code),
            setHeader: (key, value) => setHeader(event, key, value),
            getHeader: (key) => getHeader(event, key) || null,
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
        }),
        method,
      ),
  };
});
