import { createProvider as f } from "nixle";
const n = f((s) => ({
  server: s,
  request: (a, d, i) => s[a](d, ({ request: v, set: r, cookie: o }) => i({
    request: v,
    response: r,
    setStatusCode: (e) => r.status = e,
    setHeader: (e, t) => r.headers[e] = t,
    setCookie: (e, t, u) => {
      u && o[e].set(u), o[e].value = t;
    }
  }))
}));
export {
  n as elysiaProvider
};
