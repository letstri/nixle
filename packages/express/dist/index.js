import n from "cookie-parser";
import { createProvider as S } from "nixle";
const u = S((a) => (a.use(n()), {
  app: a,
  createRoute: (c, s, d) => a[c](s, async (t, r) => {
    r.send(
      await d({
        request: t,
        response: r,
        params: t.params || {},
        query: t.query || {},
        setStatusCode: (e) => r.status(e),
        setHeader: (e, i) => r.setHeader(e, i),
        getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
        setCookie: (e, i, o) => {
          const m = /* @__PURE__ */ new Map([
            ["Strict", "strict"],
            ["Lax", "lax"],
            ["None", "none"]
          ]);
          return r.cookie(e, i, {
            ...o,
            sameSite: m.get(o?.sameSite || "Strict") || "strict"
          });
        },
        getCookie: (e) => t.cookies[e] || null
      })
    );
  })
}));
export {
  u as expressProvider
};
