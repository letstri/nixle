import { fastify as m } from "fastify";
import n from "@fastify/cookie";
import { createProvider as c } from "nixle";
const h = c((t = m()) => (t.register(n), {
  app: t,
  request: (i, a, d) => t[i](a, async (o, r) => {
    r.send(
      await d({
        request: o,
        response: r,
        params: o.params || {},
        query: { ...o.query || {} },
        setStatusCode: (e) => r.status(e),
        setHeader: (e, s) => r.header(e, s),
        getHeader: (e) => o.headers[e] ? String(o.headers[e]) : null,
        setCookie: (e, s, f) => r.setCookie(e, s, f),
        getCookie: (e) => o.cookies[e] || null
      })
    );
  })
}));
export {
  h as fastifyProvider
};
