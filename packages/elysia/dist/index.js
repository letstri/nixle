import { createProvider as o, isNixleError as m } from "nixle";
const l = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), h = o((a) => (a.onError(({ error: s, set: t }) => (m(s) && (t.status = s.statusCode), s)), {
  app: a,
  createRoute: ({ method: s, path: t, handler: d }) => a[s](t, async (e) => d({
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
    setCookie: (r, i, u) => {
      u && e.cookie[r].set({
        ...u,
        sameSite: l.get(u?.sameSite || "Strict") || "strict"
      }), e.cookie[r].value = i;
    },
    getCookie: (r) => e.cookie[r].value || null
  }))
}));
export {
  h as elysiaProvider
};
