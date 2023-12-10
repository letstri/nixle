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
  const d = (t, a) => ({
    request: t,
    response: a,
    url: t.url,
    method: t.method,
    params: t.params || {},
    query: t.query || {},
    body: t.body,
    setStatusCode: (e) => a.status(e),
    setHeader: (e, o) => a.setHeader(e, o),
    getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
    headers: t.headers,
    getCookie: (e) => t.cookies[e] || null,
    setCookie: (e, o, i) => a.cookie(e, o, {
      ...i,
      sameSite: y.get(i?.sameSite || "Strict") || "strict"
    })
  });
  return {
    app: r,
    createMiddleware: (t) => r.use("*", async (a, e) => {
      e.send(await t(d(a, e)));
    }),
    createRoute: ({ method: t, path: a, middleware: e, handler: o }) => r[t](a, async (i, c) => {
      if (e) {
        const s = await e(d(i, c));
        if (s)
          return s;
      }
      c.send(await o(d(i, c)));
    })
  };
});
export {
  g as expressProvider
};
