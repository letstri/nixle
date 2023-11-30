import c from "express";
import u from "cookie-parser";
import { createProvider as f } from "nixle";
const y = f((t = c()) => (t.use(u()), {
  server: t,
  request: (s, i, m) => t[s](i, async (o, r) => {
    r.send(
      await m({
        request: o,
        response: r,
        params: o.params || {},
        query: o.query || {},
        setStatusCode: (e) => r.status(e),
        setHeader: (e, a) => r.setHeader(e, a),
        setCookie: (e, a, d = {}) => r.cookie(e, a, d)
      })
    );
  })
}));
export {
  y as expressProvider
};
