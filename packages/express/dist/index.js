import k from "cookie-parser";
import { createProvider as m } from "nixle";
const g = m((t) => (t.use(k()), {
  app: t,
  createRoute: (i, d, c) => t[i](d, async (r, o) => {
    o.send(
      await c({
        request: r,
        response: o,
        params: r.params || {},
        query: r.query || {},
        setStatusCode: (e) => o.status(e),
        setHeader: (e, a) => o.setHeader(e, a),
        getHeader: (e) => r.headers[e] ? String(r.headers[e]) : null,
        setCookie: (e, a, s = {}) => o.cookie(e, a, s),
        getCookie: (e) => r.cookies[e] || null
      })
    );
  })
}));
export {
  g as expressProvider
};
