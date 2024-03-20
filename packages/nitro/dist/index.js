import { defineEventHandler as c, getRouterParams as u, getQuery as m, readBody as n, sendRedirect as l, setResponseStatus as g, setHeader as p, getHeader as S, getRequestHeaders as y, setCookie as H, getCookie as f } from "h3";
import { createProvider as C } from "nixle";
const R = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), b = C((s) => ({
  app: s,
  createRoute: ({ method: o, path: i, handler: d }) => s.router.use(
    i,
    c(async (e) => d({
      request: e.node.req,
      response: e.node.res,
      method: e.method,
      params: u(e),
      query: m(e),
      body: ["post", "put", "patch", "delete"].includes(o) ? await n(e) : {},
      redirect: async (r, t) => {
        await l(e, r, t);
      },
      setStatusCode: (r) => g(e, r),
      setHeader: (r, t) => p(e, r, t),
      getHeader: (r) => S(e, r) || null,
      headers: Object.fromEntries(
        Object.entries(y(e)).filter(([, r]) => r)
      ),
      setCookie: (r, t, a) => H(e, r, t, {
        ...a,
        sameSite: R.get(a?.sameSite || "Strict") || "strict"
      }),
      getCookie: (r) => f(e, r) || null
    })),
    o
  )
}));
export {
  b as nitroProvider
};
