import n from "@fastify/cookie";
import { createProvider as m } from "nixle";
const h = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), k = m((o) => (o.register(n), {
  app: o,
  createRoute: ({ method: s, path: d, handler: c }) => o[s](d, async (t, a) => {
    a.send(
      await c({
        request: t.raw,
        response: a.raw,
        method: t.raw.method,
        params: { ...t.params || {} },
        query: { ...t.query || {} },
        body: { ...t.body || {} },
        redirect: async (e, r) => a.redirect(r || 302, e),
        setStatusCode: (e) => a.status(e),
        setHeader: (e, r) => a.header(e, r),
        getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
        headers: t.headers,
        getCookie: (e) => t.cookies[e] || null,
        setCookie: (e, r, i) => a.setCookie(e, r, {
          ...i,
          sameSite: h.get(i?.sameSite || "Strict") || "strict"
        })
      })
    );
  })
}));
export {
  k as fastifyProvider
};
