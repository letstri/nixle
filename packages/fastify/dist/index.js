import c from "@fastify/cookie";
import { createProvider as k } from "nixle";
const g = k((t) => (t.register(c), {
  app: t,
  createRoute: (s, i, d) => t[s](i, async (o, r) => {
    r.send(
      await d({
        request: o.raw,
        response: r.raw,
        params: o.params || {},
        query: { ...o.query || {} },
        setStatusCode: (e) => r.status(e),
        setHeader: (e, a) => r.header(e, a),
        getHeader: (e) => o.headers[e] ? String(o.headers[e]) : null,
        setCookie: (e, a, n) => r.setCookie(e, a, n),
        getCookie: (e) => o.cookies[e] || null
      })
    );
  })
}));
export {
  g as fastifyProvider
};
