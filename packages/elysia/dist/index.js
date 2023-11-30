import { Elysia as l } from "elysia";
import { createProvider as n } from "nixle";
const q = n((t = new l()) => ({
  server: t,
  request: (u, i, d) => t[u](i, ({ request: m, set: r, cookie: a, params: v, query: f }) => d({
    request: m,
    response: r,
    params: v || {},
    query: f || {},
    setStatusCode: (e) => r.status = e,
    setHeader: (e, s) => r.headers[e] = s,
    setCookie: (e, s, o) => {
      o && a[e].set(o), a[e].value = s;
    }
  }))
}));
export {
  q as elysiaProvider
};
