import { createProvider as f } from "nixle";
const q = f((s) => ({
  server: s,
  request: (d, o, i) => s[d](o, ({ request: v, set: r, cookie: u }) => i({
    req: v,
    res: r,
    setStatusCode: (e) => r.status = e,
    setHeader: (e, t) => r.headers[e] = t,
    setCookie: (e, t, a) => {
      a && u[e].set(a), u[e].value = t;
    }
  }))
}));
export {
  q as elysiaProvider
};
