import c from "cookie-parser";
import { createProvider as u } from "nixle";
const y = u((t) => (t.use(c()), {
  server: t,
  request: (i, s, d) => t[i](s, async (a, r) => {
    r.send(
      await d({
        request: a,
        response: r,
        params: a.params || {},
        query: a.query || {},
        setStatusCode: (e) => r.status(e),
        setHeader: (e, o) => r.setHeader(e, o),
        setCookie: (e, o, m = {}) => r.cookie(e, o, m)
      })
    );
  })
}));
export {
  y as expressProvider
};
