import { eventHandler as m, getRequestHeaders as l, getRouterParams as g, getQuery as h, readRawBody as n, setResponseStatus as S, setCookie as b, getCookie as f } from "h3";
import { createProvider as w } from "nixle";
const y = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), q = w((o) => ({
  app: o,
  globalMiddleware: (a) => o.router.use(
    "*",
    m(async (t) => {
      await a({
        url: t.node.req.url,
        method: t.method,
        setHeader: (s, d) => t.headers.set(s, d),
        getHeader: (s) => t.headers.get(s),
        headers: Object.fromEntries(
          Object.entries(l(t)).filter(([, s]) => s)
        )
      });
    })
  ),
  createRoute: ({ method: a, path: t, middleware: s, handler: d }) => o.router.use(
    t,
    m(async (e) => {
      const u = {
        request: e.node.req,
        response: e.node.res,
        method: e.method,
        params: g(e),
        query: h(e),
        body: await n(e),
        setStatusCode: (r) => S(e, r),
        setHeader: (r, i) => e.headers.set(r, i),
        getHeader: (r) => e.headers.get(r),
        headers: Object.fromEntries(
          Object.entries(l(e)).filter(([, r]) => r)
        ),
        setCookie: (r, i, c) => b(e, r, i, {
          ...c,
          sameSite: y.get(c?.sameSite || "Strict") || "strict"
        }),
        getCookie: (r) => f(e, r) || null
      };
      return await s(u), d(u);
    }),
    a
  )
}));
export {
  q as nitroProvider
};
