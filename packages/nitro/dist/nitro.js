import { eventHandler as i, getQuery as m, setCookie as n } from "h3";
import { createProvider as p } from "nixle";
const c = p((s) => ({
  server: s,
  request: (t, d, a) => s.router[t](
    d,
    i((r) => a({
      request: r.node.req,
      response: r.node.res,
      params: r.context.params || {},
      query: m(r),
      setStatusCode: (e) => r.node.res.statusCode = e,
      setHeader: (e, o) => r.headers.set(e, o),
      setCookie: (e, o, u) => n(r, e, o, u)
    }))
  )
}));
export {
  c as nitroProvider
};
