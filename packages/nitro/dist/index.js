import { getRequestURL as m, setHeader as u, getHeader as c, getRequestHeaders as l, eventHandler as g, getRouterParams as h, getQuery as n, readBody as H, setResponseStatus as f, setCookie as S, getCookie as b } from "h3";
import { createProvider as k } from "nixle";
const p = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), R = k((a) => ({
  app: a,
  globalMiddleware: (s) => a.hooks.hook("request", async (t) => {
    await s({
      url: m(t).href,
      method: t.method,
      setHeader: (o, e) => u(t, o, e),
      getHeader: (o) => c(t, o) || null,
      headers: Object.fromEntries(
        Object.entries(l(t)).filter(([, o]) => o)
      )
    });
  }),
  createRoute: ({ method: s, path: t, handler: o }) => a.router.use(
    t,
    g(async (e) => o({
      request: e.node.req,
      response: e.node.res,
      method: e.method,
      params: h(e),
      query: n(e),
      body: ["post", "put", "patch"].includes(s) ? await H(e) : {},
      setStatusCode: (r) => f(e, r),
      setHeader: (r, i) => u(e, r, i),
      getHeader: (r) => c(e, r) || null,
      headers: Object.fromEntries(
        Object.entries(l(e)).filter(([, r]) => r)
      ),
      setCookie: (r, i, d) => S(e, r, i, {
        ...d,
        sameSite: p.get(d?.sameSite || "Strict") || "strict"
      }),
      getCookie: (r) => b(e, r) || null
    })),
    s
  )
}));
export {
  R as nitroProvider
};
