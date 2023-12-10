import { createProvider as m } from "nixle";
var f = decodeURIComponent, h = /^[\w!#$%&'*.^`|~+-]+$/, l = /^[ !#-:<-[\]-~]*$/, u = (i, t) => i.trim().split(";").reduce((r, s) => {
  s = s.trim();
  const o = s.indexOf("=");
  if (o === -1)
    return r;
  const n = s.substring(0, o).trim();
  if (t && t !== n || !h.test(n))
    return r;
  let a = s.substring(o + 1).trim();
  return a.startsWith('"') && a.endsWith('"') && (a = a.slice(1, -1)), l.test(a) && (r[n] = f(a)), r;
}, {}), c = (i, t, e = {}) => {
  let r = `${i}=${t}`;
  return e && typeof e.maxAge == "number" && e.maxAge >= 0 && (r += `; Max-Age=${Math.floor(e.maxAge)}`), e.domain && (r += `; Domain=${e.domain}`), e.path && (r += `; Path=${e.path}`), e.expires && (r += `; Expires=${e.expires.toUTCString()}`), e.httpOnly && (r += "; HttpOnly"), e.secure && (r += "; Secure"), e.sameSite && (r += `; SameSite=${e.sameSite}`), e.partitioned && (r += "; Partitioned"), r;
}, g = (i, t, e = {}) => (t = encodeURIComponent(t), c(i, t, e)), q = (i, t) => {
  const e = i.req.raw.headers.get("Cookie");
  return typeof t == "string" ? e ? u(e, t)[t] : void 0 : e ? u(e) : {};
}, v = (i, t, e, r) => {
  const s = g(t, e, { path: "/", ...r });
  i.header("set-cookie", s, { append: !0 });
};
const y = m((i) => {
  const t = async (e) => ({
    request: e.req,
    response: e.res,
    url: e.req.url,
    method: e.req.method,
    params: e.req.param() || {},
    query: e.req.query() || {},
    body: await e.req.json(),
    setStatusCode: (r) => e.status(r),
    setHeader: (r, s) => e.header(r, s),
    getHeader: (r) => e.req.header(r) || null,
    headers: e.req.header(),
    setCookie: (r, s, o) => v(e, r, s, o),
    getCookie: (r) => q(e, r) || null
  });
  return {
    app: i,
    createMiddleware: (e) => {
      i.use(async (r) => {
        const s = await e(await t(r));
        s && r.body(s);
      });
    },
    createRoute: ({ method: e, path: r, middleware: s, handler: o }) => {
      ({
        get: i.get,
        post: i.post,
        put: i.put,
        patch: i.patch,
        delete: i.delete,
        options: i.options
      })[e](r, async (a) => {
        if (s) {
          const d = await s(await t(a));
          if (d)
            return d;
        }
        return a.body(await o(await t(a)));
      });
    }
  };
});
export {
  y as honoProvider
};
