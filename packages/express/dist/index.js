import l from "cookie-parser";
import n from "body-parser";
import { createProvider as S } from "nixle";
const g = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), x = S((o) => (o.use(l()), o.use(n.json()), {
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
    const m = {
      request: e,
      response: r,
      method: e.method,
      params: e.params || {},
      query: e.query || {},
      body: e.body,
      setStatusCode: (a) => r.status(a),
      setHeader: (a, c) => r.setHeader(a, c),
      getHeader: (a) => e.headers[a] ? String(e.headers[a]) : null,
      headers: e.headers,
      getCookie: (a) => e.cookies[a] || null,
      setCookie: (a, c, h) => r.cookie(a, c, {
        ...h,
        sameSite: g.get(h?.sameSite || "Strict") || "strict"
      })
    };
    await i(m), r.send(await s(m));
  })
}));
export {
  x as expressProvider
};
