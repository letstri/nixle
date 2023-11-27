import { fromNodeMiddleware as u } from "h3";
import { createProvider as a } from "nixle";
const f = a((r) => ({
  request: (t, o, d) => r.router[t](
    o,
    u((s, e) => d({
      req: s,
      res: e,
      setStatusCode: (i) => e.statusCode = i,
      setHeader: e.setHeader
    }))
  ),
  server: r
}));
export {
  f as nitroProvider
};
