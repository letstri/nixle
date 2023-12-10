import c from "@fastify/cookie";
import { createProvider as m } from "nixle";
const f = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), S = m((s) => {
  s.register(c);
  const i = (t, a) => ({
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
        const o = await t(i(a, e));
        o && e.send(o);
      });
    },
    createRoute: ({ method: t, path: a, middleware: e, handler: o }) => s[t](a, async (r, n) => {
      if (e) {
        const d = await e(i(r, n));
        if (d)
          return d;
      }
      n.send(await o(i(r, n)));
    })
  };
});
export {
  S as fastifyProvider
};
