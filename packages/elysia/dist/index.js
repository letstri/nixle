import { Elysia as v } from "elysia";
import { createProvider as f } from "nixle";
const C = f((a = new v()) => ({
  app: a,
  request: (d, i, l) => a[d](i, ({ request: o, set: r, cookie: t, params: m, query: n }) => l({
    request: o,
    response: r,
    params: m || {},
    query: n || {},
    setStatusCode: (e) => r.status = e,
    setHeader: (e, s) => r.headers[e] = s,
    getHeader: (e) => o.headers.get(e),
    setCookie: (e, s, u) => {
      u && t[e].set(u), t[e].value = s;
    },
    getCookie: (e) => t[e].value || null
  }))
}));
export {
  C as elysiaProvider
};
