import { createProvider as u, isNixleError as h } from "nixle";
const l = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), g = u((t) => (t.onError(({ error: a, set: s }) => (h(a) && (s.status = a.statusCode), a)), {
  app: t,
  globalMiddleware: (a) => t.onRequest(async ({ request: s, set: d }) => {
    await a({
      url: s.url,
      method: s.method,
      setHeader: (e, r) => d.headers[e] = r,
      getHeader: (e) => s.headers.get(e),
      headers: Object.fromEntries(s.headers.entries())
    });
  }),
  createRoute: ({ method: a, path: s, handler: d }) => t[a](s, async (e) => d({
    request: e.request,
    response: e.set,
    method: e.request.method,
    params: e.params || {},
    query: e.query || {},
    body: e.body || {},
    setStatusCode: (r) => e.set.status = r,
    setHeader: (r, i) => e.set.headers[r] = i,
    getHeader: (r) => e.request.headers.get(r),
    headers: Object.fromEntries(e.request.headers.entries()),
    setCookie: (r, i, o) => {
      o && e.cookie[r].set({
        ...o,
        sameSite: l.get(o?.sameSite || "Strict") || "strict"
      }), e.cookie[r].value = i;
    },
    getCookie: (r) => e.cookie[r].value || null
  }))
}));
export {
  g as elysiaProvider
};
