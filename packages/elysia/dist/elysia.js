import { createProvider as m } from "nixle";
const q = m((t) => ({
  server: t,
  request: (o, d, i) => t[o](d, ({ request: v, set: r, cookie: a, params: f, query: l }) => i({
    request: v,
    response: r,
    params: f || {},
    query: l || {},
    setStatusCode: (e) => r.status = e,
    setHeader: (e, s) => r.headers[e] = s,
    setCookie: (e, s, u) => {
      u && a[e].set(u), a[e].value = s;
    }
  }))
}));
export {
  q as elysiaProvider
};
