import { getRequestHeaders as l, eventHandler as m, getRouterParams as n, getQuery as g, readBody as h, setResponseStatus as H, setCookie as S, getCookie as b } from "h3";
import { createProvider as f } from "nixle";
const k = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), y = f((a) => ({
  app: a,
  globalMiddleware: (s) => a.hooks.hook("request", async (t) => {
    await s({
      url: t.node.req.url,
      method: t.method,
      setHeader: (o, d) => t.node.res.setHeader(o, d),
      getHeader: (o) => t.node.res.getHeader(o) || null,
      headers: Object.fromEntries(
        Object.entries(l(t)).filter(([, o]) => o)
      )
    });
  }),
  createRoute: ({ method: s, path: t, middleware: o, handler: d }) => a.router.use(
    t,
    m(async (e) => {
      const u = {
        request: e.node.req,
        response: e.node.res,
        method: e.method,
        params: n(e),
        query: g(e),
        body: ["post", "put", "patch"].includes(s) ? await h(e) : {},
        setStatusCode: (r) => H(e, r),
        setHeader: (r, i) => e.headers.set(r, i),
        getHeader: (r) => e.headers.get(r),
        headers: Object.fromEntries(
          Object.entries(l(e)).filter(([, r]) => r)
        ),
        setCookie: (r, i, c) => S(e, r, i, {
          ...c,
          sameSite: k.get(c?.sameSite || "Strict") || "strict"
        }),
        getCookie: (r) => b(e, r) || null
      };
      return await o(u), d(u);
    }),
    s
  )
}));
export {
  y as nitroProvider
};
