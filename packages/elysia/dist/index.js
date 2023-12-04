import { Elysia as v } from "elysia";
import { createProvider as f } from "nixle";
const C = f((s = new v()) => ({
  app: s,
  createRoute: (d, i, l) => s[d](i, ({ request: o, set: r, cookie: t, params: m, query: n }) => l({
    request: o,
    response: r,
    params: m || {},
    query: n || {},
    setStatusCode: (e) => r.status = e,
    setHeader: (e, a) => r.headers[e] = a,
    getHeader: (e) => o.headers.get(e),
    setCookie: (e, a, u) => {
      u && t[e].set(u), t[e].value = a;
    },
    getCookie: (e) => t[e].value || null
  }))
}));
export {
  C as elysiaProvider
};
