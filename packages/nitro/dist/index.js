import { eventHandler as i, getQuery as m, setCookie as C, getCookie as g } from "h3";
import { createProvider as c } from "nixle";
const p = c((t) => ({
  app: t,
  createRoute: (s, a, d) => t.router[s](
    a,
    i((e) => d({
      request: e.node.req,
      response: e.node.res,
      params: e.context.params || {},
      query: m(e),
      setStatusCode: (r) => e.node.res.statusCode = r,
      setHeader: (r, o) => e.headers.set(r, o),
      getHeader: (r) => e.headers.get(r),
      setCookie: (r, o, u) => C(e, r, o, u),
      getCookie: (r) => g(e, r) || null
    }))
  )
}));
export {
  p as nitroProvider
};
