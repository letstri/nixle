import type { Hono, Context } from 'hono';
import { setCookie, getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { createProvider, type HTTPMethod } from 'nixle';

type HonoRequest = Context['req'];
type HonoResponse = Context['res'];

declare global {
  namespace Nixle {
    interface Provider extends Hono {}
    interface Request extends HonoRequest {}
    interface Response extends HonoResponse {}
  }
}

export const honoProvider = createProvider((app) => {
  return {
    app,
    globalMiddleware: (middleware) => {
      app.use(
        '*',
        createMiddleware(async (c, next) => {
          await middleware({
            url: c.req.url,
            method: c.req.method as HTTPMethod,
            setHeader: (key, value) => c.res.headers.set(key, value),
            getHeader: (key) => c.req.header(key) || null,
            headers: c.req.header(),
          });

          await next();
        }),
      );
    },
    createRoute: ({ method, path, handler }) => {
      const methods: Record<typeof method, typeof app.get> = {
        get: app.get,
        post: app.post,
        put: app.put,
        patch: app.patch,
        delete: app.delete,
        options: app.options,
      };

      methods[method](path, async (context) => {
        return context.json(
          await handler({
            request: context.req,
            response: context.res,
            method: context.req.method as HTTPMethod,
            params: (context.req.param() as Record<string, string>) || {},
            query: (context.req.query() as Record<string, string | string[]>) || {},
            body: await context.req.json(),
            setStatusCode: (code) => context.status(code),
            setHeader: (key, value) => context.header(key, value),
            getHeader: (key) => context.req.header(key) || null,
            headers: context.req.header(),
            setCookie: (name, value, options) => setCookie(context, name, value, options),
            getCookie: (name) => getCookie(context, name) || null,
          }),
        );
      });
    },
  };
});
