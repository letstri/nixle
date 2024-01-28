import { defineEventHandler as u, getRouterParams as c, getQuery as m, readBody as n, setResponseStatus as g, setHeader as l, getHeader as p, getRequestHeaders as S, setCookie as H, getCookie as f } from "h3";
import { createProvider as y } from "nixle";
const C = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), R = y((o) => ({
  app: o,
  createRoute: ({ method: s, path: i, handler: d }) => o.router.use(
    i,
    u(async (e) => d({
      request: e.node.req,
      response: e.node.res,
      method: e.method,
      params: c(e),
      query: m(e),
      body: ["post", "put", "patch"].includes(s) ? await n(e) : {},
      setStatusCode: (r) => g(e, r),
      setHeader: (r, t) => l(e, r, t),
      getHeader: (r) => p(e, r) || null,
      headers: Object.fromEntries(
        Object.entries(S(e)).filter(([, r]) => r)
      ),
      setCookie: (r, t, a) => H(e, r, t, {
        ...a,
        sameSite: C.get(a?.sameSite || "Strict") || "strict"
      }),
      getCookie: (r) => f(e, r) || null
    })),
    s
  )
}));
export {
  R as nitroProvider
};
