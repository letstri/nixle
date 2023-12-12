import m from "@fastify/cookie";
import { createProvider as w } from "nixle";
const l = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), k = w((d) => (d.register(m), {
  app: d,
  globalMiddleware: (i) => d.addHook("onRequest", async (t, s) => {
    await i({
      url: t.raw.url,
      method: t.raw.method,
      setHeader: (o, e) => s.header(o, e),
      getHeader: (o) => t.headers[o] ? String(t.headers[o]) : null,
      headers: t.headers
    });
  }),
  createRoute: ({ method: i, path: t, middleware: s, handler: o }) => d[i](t, async (e, r) => {
    const h = {
      request: e.raw,
      response: r.raw,
      method: e.raw.method,
      params: { ...e.params || {} },
      query: { ...e.query || {} },
      body: { ...e.body || {} },
      setStatusCode: (a) => r.status(a),
      setHeader: (a, n) => r.header(a, n),
      getHeader: (a) => e.headers[a] ? String(e.headers[a]) : null,
      headers: e.headers,
      getCookie: (a) => e.cookies[a] || null,
      setCookie: (a, n, c) => r.setCookie(a, n, {
        ...c,
        sameSite: l.get(c?.sameSite || "Strict") || "strict"
      })
    };
    await s(h), r.send(await o(h));
  })
}));
export {
  k as fastifyProvider
};
