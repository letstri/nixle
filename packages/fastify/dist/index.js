import m from "@fastify/cookie";
import { createProvider as S } from "nixle";
const u = S((a) => (a.register(m), {
  app: a,
  createRoute: (i, n, c) => a[i](n, async (t, r) => {
    r.send(
      await c({
        request: t.raw,
        response: r.raw,
        params: t.params || {},
        query: { ...t.query || {} },
        setStatusCode: (e) => r.status(e),
        setHeader: (e, o) => r.header(e, o),
        getHeader: (e) => t.headers[e] ? String(t.headers[e]) : null,
        setCookie: (e, o, s) => {
          const d = /* @__PURE__ */ new Map([
            ["Strict", "strict"],
            ["Lax", "lax"],
            ["None", "none"]
          ]);
          return r.setCookie(e, o, {
            ...s,
            sameSite: d.get(s?.sameSite || "Strict") || "strict"
          });
        },
        getCookie: (e) => t.cookies[e] || null
      })
    );
  })
}));
export {
  u as fastifyProvider
};
