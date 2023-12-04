import m from "express";
import k from "cookie-parser";
import { createProvider as l } from "nixle";
const x = l((t = m()) => (t.use(k()), {
  app: t,
  createRoute: (i, d, s) => t[i](d, async (r, o) => {
    o.send(
      await s({
        request: r,
        response: o,
        params: r.params || {},
        query: r.query || {},
        setStatusCode: (e) => o.status(e),
        setHeader: (e, a) => o.setHeader(e, a),
        getHeader: (e) => r.headers[e] ? String(r.headers[e]) : null,
        setCookie: (e, a, c = {}) => o.cookie(e, a, c),
        getCookie: (e) => r.cookies[e] || null
      })
    );
  })
}));
export {
  x as expressProvider
};
