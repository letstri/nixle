import { eventHandler as i, getQuery as m, setCookie as C, getCookie as g } from "h3";
import { createProvider as k } from "nixle";
const q = k((t) => ({
  app: t,
  request: (s, d, a) => t.router[s](
    d,
    i((e) => a({
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
  q as nitroProvider
};
