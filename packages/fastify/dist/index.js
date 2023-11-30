import { fastify as d } from "fastify";
import y from "@fastify/cookie";
import { createProvider as c } from "nixle";
const C = c((e = d()) => (e.register(y), {
  server: e,
  request: (i, m, f) => e[i](m, async (o, r) => {
    r.send(
      await f({
        request: o,
        response: r,
        params: o.params || {},
        query: { ...o.query || {} },
        setStatusCode: (t) => r.status(t),
        setHeader: (t, a) => r.header(t, a),
        setCookie: (t, a, s) => r.setCookie(t, a, s)
      })
    );
  })
}));
export {
  C as fastifyProvider
};
