import c from "cookie-parser";
import h from "body-parser";
import { createProvider as l } from "nixle";
const n = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), H = l((o) => (o.use(c()), o.use(h.json()), {
  app: o,
  globalMiddleware: (d) => o.use(async (t, i, a) => {
    await d({
      url: t.url,
      method: t.method,
      setHeader: (r, e) => i.setHeader(r, e),
      getHeader: (r) => t.headers[r] ? String(t.headers[r]) : null,
      headers: t.headers
    }), a();
  }),
  createRoute: ({ method: d, path: t, handler: i }) => o[d](t, async (a, r) => {
    r.send(
      await i({
        request: a,
        response: r,
        method: a.method,
        params: a.params || {},
        query: a.query || {},
        body: a.body,
        setStatusCode: (e) => r.status(e),
        setHeader: (e, s) => r.setHeader(e, s),
        getHeader: (e) => a.headers[e] ? String(a.headers[e]) : null,
        headers: a.headers,
        getCookie: (e) => a.cookies[e] || null,
        setCookie: (e, s, m) => r.cookie(e, s, {
          ...m,
          sameSite: n.get(m?.sameSite || "Strict") || "strict"
        })
      })
    );
  })
}));
export {
  H as expressProvider
};
