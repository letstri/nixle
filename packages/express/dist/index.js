import "express";
import m from "cookie-parser";
import n from "body-parser";
import { createProvider as l } from "nixle";
const y = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), g = l((r) => {
  r.use(m()), r.use(n.json());
  const c = (e, a) => ({
    request: e,
    response: a,
    url: e.url,
    method: e.method,
    params: e.params || {},
    query: e.query || {},
    body: e.body,
    setStatusCode: (t) => a.status(t),
    setHeader: (t, o) => a.setHeader(t, o),
    getHeader: (t) => e.headers[t] ? String(e.headers[t]) : null,
    headers: e.headers,
    getCookie: (t) => e.cookies[t] || null,
    setCookie: (t, o, i) => a.cookie(t, o, {
      ...i,
      sameSite: y.get(i?.sameSite || "Strict") || "strict"
    })
  });
  return {
    app: r,
    createMiddleware: (e) => r.use("*", async (a, t) => {
      t.send(await e(c(a, t)));
    }),
    createRoute: ({ method: e, path: a, middleware: t, handler: o }) => r[e](a, async (i, d) => {
      if (t) {
        const s = await t(c(i, d));
        if (s) {
          d.send(s);
          return;
        }
      }
      d.send(await o(c(i, d)));
    })
  };
});
export {
  g as expressProvider
};
