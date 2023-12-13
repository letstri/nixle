import { getRequestURL as g, setHeader as l, getHeader as m, getRequestHeaders as n, eventHandler as h, getRouterParams as H, getQuery as f, readBody as S, setResponseStatus as b, setCookie as k, getCookie as p } from "h3";
import { createProvider as q } from "nixle";
const y = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), w = q((a) => ({
  app: a,
  globalMiddleware: (s) => a.hooks.hook("request", async (r) => {
    await s({
      url: g(r).href,
      method: r.method,
      setHeader: (o, i) => l(r, o, i),
      getHeader: (o) => m(r, o) || null,
      headers: Object.fromEntries(
        Object.entries(n(r)).filter(([, o]) => o)
      )
    });
  }),
  createRoute: ({ method: s, path: r, middleware: o, handler: i }) => a.router.use(
    r,
    h(async (e) => {
      const u = {
        request: e.node.req,
        response: e.node.res,
        method: e.method,
        params: H(e),
        query: f(e),
        body: ["post", "put", "patch"].includes(s) ? await S(e) : {},
        setStatusCode: (t) => b(e, t),
        setHeader: (t, d) => l(e, t, d),
        getHeader: (t) => m(e, t) || null,
        headers: Object.fromEntries(
          Object.entries(n(e)).filter(([, t]) => t)
        ),
        setCookie: (t, d, c) => k(e, t, d, {
          ...c,
          sameSite: y.get(c?.sameSite || "Strict") || "strict"
        }),
        getCookie: (t) => p(e, t) || null
      };
      return await o(u), i(u);
    }),
    s
  )
}));
export {
  w as nitroProvider
};
