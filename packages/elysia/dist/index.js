import { createProvider as n } from "nixle";
const f = n((s) => ({
  app: s,
  createRoute: (o, l, i) => s[o](l, ({ request: u, set: r, cookie: t, params: v, query: g }) => i({
    request: u,
    response: r,
    params: v || {},
    query: g || {},
    setStatusCode: (e) => r.status = e,
    setHeader: (e, a) => r.headers[e] = a,
    getHeader: (e) => u.headers.get(e),
    setCookie: (e, a, d) => {
      d && t[e].set(d), t[e].value = a;
    },
    getCookie: (e) => t[e].value || null
  }))
}));
export {
  f as elysiaProvider
};
