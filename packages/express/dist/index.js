import m from "cookie-parser";
import n from "body-parser";
import { createProvider as S } from "nixle";
const h = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), g = S((r) => (r.use(m()), r.use(n.json()), {
  app: r,
  createRoute: ({ method: d, path: s, handler: c }) => r[d](s, async (t, o) => {
    o.send(
      await c({
        request: t,
        response: o,
        method: t.method,
        params: t.params || {},
        query: t.query || {},
        body: t.body,
        setStatusCode: (e) => o.status(e),
        setHeader: (e, a) => o.setHeader(e, a),
        getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
        headers: t.headers,
        getCookie: (e) => t.cookies[e] || null,
        setCookie: (e, a, i) => o.cookie(e, a, {
          ...i,
          sameSite: h.get(i?.sameSite || "Strict") || "strict"
        })
      })
    );
  })
}));
export {
  g as expressProvider
};
