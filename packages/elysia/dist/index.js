import { createProvider as o, isNixleError as m } from "nixle";
const l = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), y = o((t) => (t.onError(({ error: a, set: i }) => (m(a) && (i.status = a.statusCode), a)), {
  app: t,
  createRoute: ({ method: a, path: i, handler: d }) => t[a](i, async (e) => d({
    request: e.request,
    response: e.set,
    method: e.request.method,
    params: e.params || {},
    query: e.query || {},
    body: e.body || {},
    redirect: async (r, s) => {
      s && (e.set.status = s), e.set.redirect = r;
    },
    setStatusCode: (r) => e.set.status = r,
    setHeader: (r, s) => e.set.headers[r] = s,
    getHeader: (r) => e.request.headers.get(r),
    headers: Object.fromEntries(e.request.headers.entries()),
    setCookie: (r, s, u) => {
      u && e.cookie[r].set({
        ...u,
        sameSite: l.get(u?.sameSite || "Strict") || "strict"
      }), e.cookie[r].value = s;
    },
    getCookie: (r) => e.cookie[r].value || null
  }))
}));
export {
  y as elysiaProvider
};
