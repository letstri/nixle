import { getQuery as m, setCookie as u, getCookie as c } from "h3";
import { createProvider as S } from "nixle";
const C = S((o) => ({
  app: o,
  createRoute: (a, i, d) => o.router[a](
    i,
    (e) => d({
      request: e.node.req,
      response: e.node.res,
      params: e.context.params || {},
      query: m(e),
      setStatusCode: (r) => e.node.res.statusCode = r,
      setHeader: (r, t) => e.headers.set(r, t),
      getHeader: (r) => e.headers.get(r),
      setCookie: (r, t, s) => u(e, r, t, {
        ...s,
        sameSite: (/* @__PURE__ */ new Map([
          ["Strict", "strict"],
          ["Lax", "lax"],
          ["None", "none"]
        ])).get(s?.sameSite || "Strict") || "strict"
      }),
      getCookie: (r) => c(e, r) || null
    })
  )
}));
export {
  C as nitroProvider
};
