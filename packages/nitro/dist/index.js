import { eventHandler as u, getQuery as m, setCookie as c, getCookie as n } from "h3";
import { createProvider as S } from "nixle";
const k = S((o) => ({
  app: o,
  createRoute: (a, i, d) => o.router[a](
    i,
    u((e) => d({
      request: e.node.req,
      response: e.node.res,
      params: e.context.params || {},
      query: m(e),
      setStatusCode: (r) => e.node.res.statusCode = r,
      setHeader: (r, t) => e.headers.set(r, t),
      getHeader: (r) => e.headers.get(r),
      setCookie: (r, t, s) => c(e, r, t, {
        ...s,
        sameSite: (/* @__PURE__ */ new Map([
          ["Strict", "strict"],
          ["Lax", "lax"],
          ["None", "none"]
        ])).get(s?.sameSite || "Strict") || "strict"
      }),
      getCookie: (r) => n(e, r) || null
    }))
  )
}));
export {
  k as nitroProvider
};
