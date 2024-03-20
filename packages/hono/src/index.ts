import type { Hono, Context } from 'hono';
import { setCookie, getCookie } from 'hono/cookie';
import type { StatusCode } from 'hono/utils/http-status';
import { createProvider, type HTTPMethod } from 'nixle';

type HonoRequest = Context['req'];
type HonoResponse = Context['res'];

export interface Request extends HonoRequest {}
export interface Response extends HonoResponse {}

export const honoProvider = createProvider<Hono>((app) => {
  return {
    app,
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
            body: ['post', 'put', 'patch', 'delete'].includes(method)
              ? await context.req.json()
              : {},
            redirect: async (url, status) => {
              await context.redirect(url, status);
            },
            setStatusCode: (code) => context.status(code as StatusCode),
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
