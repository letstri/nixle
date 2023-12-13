import { getRequestURL as n, getHeader as l, getRequestHeaders as m, eventHandler as g, getRouterParams as h, getQuery as H, readBody as f, setResponseStatus as S, setHeader as b, setCookie as k, getCookie as p } from "h3";
import { createProvider as q } from "nixle";
const y = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), w = q((a) => ({
  app: a,
  globalMiddleware: (s) => a.hooks.hook("request", async (t) => {
    await s({
      url: n(t).href,
      method: t.method,
      setHeader: (o, d) => t.node.res.setHeader(o, d),
      getHeader: (o) => l(t, o) || null,
      headers: Object.fromEntries(
        Object.entries(m(t)).filter(([, o]) => o)
      )
    });
  }),
  createRoute: ({ method: s, path: t, middleware: o, handler: d }) => a.router.use(
    t,
    g(async (e) => {
      const u = {
        request: e.node.req,
        response: e.node.res,
        method: e.method,
        params: h(e),
        query: H(e),
        body: ["post", "put", "patch"].includes(s) ? await f(e) : {},
        setStatusCode: (r) => S(e, r),
        setHeader: (r, i) => b(e, r, i),
        getHeader: (r) => l(e, r) || null,
        headers: Object.fromEntries(
          Object.entries(m(e)).filter(([, r]) => r)
        ),
        setCookie: (r, i, c) => k(e, r, i, {
          ...c,
          sameSite: y.get(c?.sameSite || "Strict") || "strict"
        }),
        getCookie: (r) => p(e, r) || null
      };
      return await o(u), d(u);
    }),
    s
  )
}));
export {
  w as nitroProvider
};
