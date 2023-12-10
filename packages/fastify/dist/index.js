import c from "@fastify/cookie";
import { createProvider as m } from "nixle";
const f = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), S = m((s) => {
  s.register(c);
  const n = (t, a) => ({
    request: t.raw,
    response: a.raw,
    url: t.raw.url || "",
    method: t.raw.method,
    params: { ...t.params || {} },
    query: { ...t.query || {} },
    body: { ...t.body || {} },
    setStatusCode: (e) => a.status(e),
    setHeader: (e, o) => a.header(e, o),
    getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
    headers: t.headers,
    getCookie: (e) => t.cookies[e] || null,
    setCookie: (e, o, r) => a.setCookie(e, o, {
      ...r,
      sameSite: f.get(r?.sameSite || "Strict") || "strict"
    })
  });
  return {
    app: s,
    createMiddleware: (t) => {
      s.addHook("onRequest", async (a, e) => {
        const o = await t(n(a, e));
        o && e.send(o);
      });
    },
    createRoute: ({ method: t, path: a, middleware: e, handler: o }) => s[t](a, async (r, i) => {
      if (e) {
        const d = await e(n(r, i));
        if (d) {
          i.send(d);
          return;
        }
      }
      i.send(await o(n(r, i)));
    })
  };
});
export {
  S as fastifyProvider
};
