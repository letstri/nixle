import "express";
import h from "cookie-parser";
import l from "body-parser";
import { createProvider as S } from "nixle";
const g = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), b = S((o) => (o.use(h()), o.use(l.json()), {
  app: o,
  globalMiddleware: (d) => o.use(async (t, i, s) => {
    await d({
      url: t.url,
      method: t.method,
      setHeader: (e, r) => i.setHeader(e, r),
      getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
      headers: t.headers
    }), s();
  }),
  createRoute: ({ method: d, path: t, middleware: i, handler: s }) => o[d](t, async (e, r) => {
    const c = {
      request: e,
      response: r,
      method: e.method,
      params: e.params || {},
      query: e.query || {},
      body: e.body,
      setStatusCode: (a) => r.status(a),
      setHeader: (a, m) => r.setHeader(a, m),
      getHeader: (a) => e.headers[a] ? String(e.headers[a]) : null,
      headers: e.headers,
      getCookie: (a) => e.cookies[a] || null,
      setCookie: (a, m, n) => r.cookie(a, m, {
        ...n,
        sameSite: g.get(n?.sameSite || "Strict") || "strict"
      })
    };
    await i(c), r.send(await s(c));
  })
}));
export {
  b as expressProvider
};
