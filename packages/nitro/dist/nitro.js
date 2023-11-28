import { eventHandler as a, setCookie as n } from "h3";
import { createProvider as m } from "nixle";
const c = m((o) => ({
  server: o,
  request: (t, s, d) => o.router[t](
    s,
    a((e) => d({
      req: e.node.req,
      res: e.node.res,
      setStatusCode: (r) => e.node.res.statusCode = r,
      setHeader: e.headers.set,
      setCookie: (r, i, u) => n(e, r, i, u)
    }))
  )
}));
export {
  c as nitroProvider
};
