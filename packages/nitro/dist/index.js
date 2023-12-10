import { eventHandler as u, getRouterParams as c, getQuery as n, readRawBody as m, setResponseStatus as f, getRequestHeaders as g, setCookie as l, getCookie as w } from "h3";
import { createProvider as y } from "nixle";
const S = /* @__PURE__ */ new Map([
  ["Strict", "strict"],
  ["Lax", "lax"],
  ["None", "none"]
]), q = y((a) => {
  const o = async (e) => ({
    request: e.node.req,
    response: e.node.res,
    url: e.node.req.url || "",
    method: e.method,
    params: c(e),
    query: n(e),
    body: await m(e),
    setStatusCode: (r) => f(e, r),
    setHeader: (r, t) => e.headers.set(r, t),
    getHeader: (r) => e.headers.get(r),
    headers: Object.fromEntries(
      Object.entries(g(e)).filter(([, r]) => r)
    ),
    setCookie: (r, t, s) => l(e, r, t, {
      ...s,
      sameSite: S.get(s?.sameSite || "Strict") || "strict"
    }),
    getCookie: (r) => w(e, r) || null
  });
  return {
    app: a,
    createMiddleware: (e) => a.router.use(
      "*",
      u(async (r) => {
        r.context;
        const t = await e(await o(r));
        if (t)
          return t;
      })
    ),
    createRoute: ({ method: e, path: r, middleware: t, handler: s }) => a.router.use(
      r,
      u(async (i) => {
        if (t) {
          const d = await t(await o(i));
          if (d)
            return d;
        }
        return s(await o(i));
      }),
      e
    )
  };
});
export {
  q as nitroProvider
};
