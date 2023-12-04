import { fastify as m } from "fastify";
import n from "@fastify/cookie";
import { createProvider as c } from "nixle";
const h = c((t = m()) => (t.register(n), {
  app: t,
  createRoute: (i, s, d) => t[i](s, async (o, r) => {
    r.send(
      await d({
        request: o,
        response: r,
        params: o.params || {},
        query: { ...o.query || {} },
        setStatusCode: (e) => r.status(e),
        setHeader: (e, a) => r.header(e, a),
        getHeader: (e) => o.headers[e] ? String(o.headers[e]) : null,
        setCookie: (e, a, f) => r.setCookie(e, a, f),
        getCookie: (e) => o.cookies[e] || null
      })
    );
  })
}));
export {
  h as fastifyProvider
};
