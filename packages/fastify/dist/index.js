import c from "@fastify/cookie";
import { createProvider as f } from "nixle";
const k = f((e) => (e.register(c), {
  server: e,
  request: (i, d, m) => e[i](d, async (a, r) => {
    r.send(
      await m({
        request: a,
        response: r,
        params: a.params || {},
        query: { ...a.query || {} },
        setStatusCode: (t) => r.status(t),
        setHeader: (t, o) => r.header(t, o),
        setCookie: (t, o, s) => r.setCookie(t, o, s)
      })
    );
  })
}));
export {
  k as fastifyProvider
};
