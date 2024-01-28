import { eventHandler as u, getRouterParams as c, getQuery as m, readBody as n, setResponseStatus as g, setHeader as l, getHeader as p, getRequestHeaders as S, setCookie as H, getCookie as y } from "h3";
import { createProvider as C } from "nixle";
const f = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), R = C((o) => ({
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
        sameSite: f.get(a?.sameSite || "Strict") || "strict"
      }),
      getCookie: (r) => y(e, r) || null
    })),
    s
  )
}));
export {
  R as nitroProvider
};
