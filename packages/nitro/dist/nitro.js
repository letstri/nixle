import { eventHandler as n, setCookie as a } from "h3";
import { createProvider as m } from "nixle";
const c = m((o) => ({
  server: o,
  request: (s, t, d) => o.router[s](
    t,
    n((e) => d({
      request: e.node.req,
      response: e.node.res,
      setStatusCode: (r) => e.node.res.statusCode = r,
      setHeader: e.headers.set,
      setCookie: (r, i, u) => a(e, r, i, u)
    }))
  )
}));
export {
  c as nitroProvider
};
