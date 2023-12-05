import { createProvider as m } from "nixle";
const v = m((i) => ({
  app: i,
  createRoute: (u, d, n) => i[u](d, ({ request: o, set: t, cookie: r, params: c, query: l }) => n({
    request: o,
    response: t,
    params: c || {},
    query: l || {},
    setStatusCode: (e) => t.status = e,
    setHeader: (e, a) => t.headers[e] = a,
    getHeader: (e) => o.headers.get(e),
    setCookie: (e, a, s) => {
      const S = /* @__PURE__ */ new Map([
        ["Strict", "strict"],
        ["Lax", "lax"],
        ["None", "none"]
      ]);
      s && r[e].set({
        ...s,
        sameSite: S.get(s?.sameSite || "Strict") || "strict"
      }), r[e].value = a;
    },
    getCookie: (e) => r[e].value || null
  }))
}));
export {
  v as elysiaProvider
};
