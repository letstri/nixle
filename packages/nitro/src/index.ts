import type { IncomingMessage, ServerResponse } from 'http';
import {
  setCookie,
  getCookie,
  getQuery,
  defineEventHandler,
  getRequestHeaders,
  getRouterParams,
  setResponseStatus,
  getHeader,
  setHeader,
  readBody,
  sendRedirect,
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
    createRoute: ({ method, path, handler }) =>
      app.router.use(
        path,
        defineEventHandler(async (event) => {
          return handler({
            request: event.node.req,
            response: event.node.res,
            method: event.method as HTTPMethod,
            params: getRouterParams(event),
            query: getQuery(event),
            body: ['post', 'put', 'patch'].includes(method) ? await readBody(event) : {},
            redirect: async (url, status) => {
              await sendRedirect(event, url, status);
            },
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
