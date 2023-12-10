import { createProvider as o } from "nixle";
const m = o((i) => {
  const u = (e) => ({
    request: e.request,
    response: e.set,
    url: e.request.url,
    method: e.request.method,
    params: e.params || {},
    query: e.query || {},
    body: e.body || {},
    setStatusCode: (r) => e.set.status = r,
    setHeader: (r, s) => e.set.headers[r] = s,
    getHeader: (r) => e.request.headers.get(r),
    headers: Object.fromEntries(e.request.headers.entries()),
    setCookie: (r, s, a) => {
      const t = /* @__PURE__ */ new Map([
        ["Strict", "strict"],
        ["Lax", "lax"],
        ["None", "none"]
      ]);
      a && e.cookie[r].set({
        ...a,
        sameSite: t.get(a?.sameSite || "Strict") || "strict"
      }), e.cookie[r].value = s;
    },
    getCookie: (r) => e.cookie[r].value || null
  });
  return {
    app: i,
    createMiddleware: (e) => i.onBeforeHandle((r) => e(u(r))),
    createRoute: ({ method: e, path: r, middleware: s, handler: a }) => i[e](r, async (t) => {
      if (s) {
        const d = await s(u(t));
        if (d)
          return d;
      }
      return a(u(t));
    })
  };
});
export {
  m as elysiaProvider
};
