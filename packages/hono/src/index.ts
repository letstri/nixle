import type { Hono, Context } from 'hono';
import { setCookie, getCookie } from 'hono/cookie';
import { createProvider } from 'nixle';

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
    createRoute: (method, path, handler) => {
      const methods: Record<typeof method, typeof app.get> = {
        get: app.get,
        post: app.post,
        put: app.put,
        patch: app.patch,
        delete: app.delete,
        options: app.options,
      };

      methods[method](path, async (context) =>
        context.body(
          await handler({
            request: context.req,
            response: context.res,
            params: (context.req.param() as Record<string, string>) || {},
            query: (context.req.query() as Record<string, string | string[]>) || {},
            setStatusCode: (code) => context.status(code),
            setHeader: (key, value) => context.header(key, value),
            getHeader: (key) => context.req.header(key) || null,
            setCookie: (name, value, options) => setCookie(context, name, value, options),
            getCookie: (name) => getCookie(context, name) || null,
          }),
        ),
      );
    },
  };
});
