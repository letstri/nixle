import { eventHandler, setCookie, getQuery } from 'h3';
import type { NitroApp } from 'nitropack';
import { createProvider } from 'nixle';

export const nitroProvider = createProvider<NitroApp>((app) => {
  return {
    server: app,
    request: (method, path, handler) =>
      app.router[method](
        path,
        eventHandler((event) => {
          return handler({
            request: event.node.req,
            response: event.node.res,
            params: event.context.params || {},
            query: getQuery(event),
            setStatusCode: (code) => (event.node.res.statusCode = code),
            setHeader: (key, value) => event.headers.set(key, value),
            setCookie: (name, value, options) => setCookie(event, name, value, options),
          });
        }),
      ),
  };
});
