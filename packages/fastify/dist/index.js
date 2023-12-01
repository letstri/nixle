import { fastify as s } from "fastify";
import c from "@fastify/cookie";
import { createProvider as k } from "nixle";
const C = k((e = s()) => (e.register(c), {
  app: e,
  request: (a, d, f) => e[a](d, async (t, o) => {
    o.send(
      await f({
        request: t,
        response: o,
        params: t.params || {},
        query: { ...t.query || {} },
        setStatusCode: (r) => o.status(r),
        setHeader: (r, i) => o.header(r, i),
        getHeader: (r) => t.headers[r] ? String(t.headers[r]) : null,
        setCookie: (r, i, m) => o.setCookie(r, i, m),
        getCookie: (r) => t.cookies[r] || null
      })
    );
  })
}));
export {
  C as fastifyProvider
};
