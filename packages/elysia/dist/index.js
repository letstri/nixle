import { createProvider as l, isNixleError as m } from "nixle";
const g = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), y = l((d) => (d.onError(({ error: a, set: s }) => (m(a) && (s.status = a.statusCode), a)), {
  app: d,
  globalMiddleware: (a) => d.onRequest(async ({ request: s, set: i }) => {
    await a({
      url: s.url,
      method: s.method,
      setHeader: (t, e) => i.headers[t] = e,
      getHeader: (t) => s.headers.get(t),
      headers: Object.fromEntries(s.headers.entries())
    });
  }),
  createRoute: ({ method: a, path: s, middleware: i, handler: t }) => d[a](s, async (e) => {
    const h = {
      request: e.request,
      response: e.set,
      method: e.request.method,
      params: e.params || {},
      query: e.query || {},
      body: e.body || {},
      setStatusCode: (r) => e.set.status = r,
      setHeader: (r, o) => e.set.headers[r] = o,
      getHeader: (r) => e.request.headers.get(r),
      headers: Object.fromEntries(e.request.headers.entries()),
      setCookie: (r, o, u) => {
        u && e.cookie[r].set({
          ...u,
          sameSite: g.get(u?.sameSite || "Strict") || "strict"
        }), e.cookie[r].value = o;
      },
      getCookie: (r) => e.cookie[r].value || null
    };
    return await i(h), t(h);
  })
}));
export {
  y as elysiaProvider
};
