import s from "cookie-parser";
import n from "body-parser";
import { createProvider as y } from "nixle";
const S = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), g = y((o) => (o.use(s()), o.use(n.json()), {
  app: o,
  createRoute: ({ method: d, path: c, handler: m }) => o[d](c, async (t, r) => {
    r.send(
      await m({
        request: t,
        response: r,
        method: t.method,
        params: t.params || {},
        query: t.query || {},
        body: t.body,
        redirect: async (e, a) => r.redirect(a || 302, e),
        setStatusCode: (e) => r.status(e),
        setHeader: (e, a) => r.setHeader(e, a),
        getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
        headers: t.headers,
        getCookie: (e) => t.cookies[e] || null,
        setCookie: (e, a, i) => r.cookie(e, a, {
          ...i,
          sameSite: S.get(i?.sameSite || "Strict") || "strict"
        })
      })
    );
  })
}));
export {
  g as expressProvider
};
