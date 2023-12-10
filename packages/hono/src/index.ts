import type { Hono, Context } from 'hono';
import { setCookie, getCookie } from 'hono/cookie';
import { createProvider, type HTTPMethod, type RouteHandlerContext } from 'nixle';

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
  const formatHandler = async (context: Context): Promise<RouteHandlerContext> => ({
    request: context.req,
    response: context.res,
    url: context.req.url,
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
  });

  return {
    app,
    createMiddleware: (handler) => {
      app.use(async (context) => {
        const response = await handler(await formatHandler(context));

        if (response) {
          return context.body(response);
        }
      });
    },
    createRoute: ({ method, path, middleware, handler }) => {
      const methods: Record<typeof method, typeof app.get> = {
        get: app.get,
        post: app.post,
        put: app.put,
        patch: app.patch,
        delete: app.delete,
        options: app.options,
      };

      methods[method](path, async (context) => {
        if (middleware) {
          const response = await middleware(await formatHandler(context));

          if (response) {
            return context.body(response);
          }
        }

        return context.body(await handler(await formatHandler(context)));
      });
    },
  };
});
