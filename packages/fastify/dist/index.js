import n from "@fastify/cookie";
import { createProvider as c } from "nixle";
const m = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), l = c((t) => (t.register(n), {
  app: t,
  globalMiddleware: (d) => t.addHook("onRequest", async (r, i) => {
    await d({
      url: r.raw.url,
      method: r.raw.method,
      setHeader: (e, o) => i.header(e, o),
      getHeader: (e) => r.headers[e] ? String(r.headers[e]) : null,
      headers: r.headers
    });
  }),
  createRoute: ({ method: d, path: r, handler: i }) => t[d](r, async (e, o) => {
    o.send(
      await i({
        request: e.raw,
        response: o.raw,
        method: e.raw.method,
        params: { ...e.params || {} },
        query: { ...e.query || {} },
        body: { ...e.body || {} },
        setStatusCode: (a) => o.status(a),
        setHeader: (a, s) => o.header(a, s),
        getHeader: (a) => e.headers[a] ? String(e.headers[a]) : null,
        headers: e.headers,
        getCookie: (a) => e.cookies[a] || null,
        setCookie: (a, s, h) => o.setCookie(a, s, {
          ...h,
          sameSite: m.get(h?.sameSite || "Strict") || "strict"
        })
      })
    );
  })
}));
export {
  l as fastifyProvider
};
