import { createProvider as m } from "nixle";
var h = decodeURIComponent, f = /^[\w!#$%&'*.^`|~+-]+$/, l = /^[ !#-:<-[\]-~]*$/, d = (i, s) => i.trim().split(";").reduce((r, n) => {
  n = n.trim();
  const t = n.indexOf("=");
  if (t === -1)
    return r;
  const o = n.substring(0, t).trim();
  if (s && s !== o || !f.test(o))
    return r;
  let a = n.substring(t + 1).trim();
  return a.startsWith('"') && a.endsWith('"') && (a = a.slice(1, -1)), l.test(a) && (r[o] = h(a)), r;
}, {}), g = (i, s, e = {}) => {
  let r = `${i}=${s}`;
  return e && typeof e.maxAge == "number" && e.maxAge >= 0 && (r += `; Max-Age=${Math.floor(e.maxAge)}`), e.domain && (r += `; Domain=${e.domain}`), e.path && (r += `; Path=${e.path}`), e.expires && (r += `; Expires=${e.expires.toUTCString()}`), e.httpOnly && (r += "; HttpOnly"), e.secure && (r += "; Secure"), e.sameSite && (r += `; SameSite=${e.sameSite}`), e.partitioned && (r += "; Partitioned"), r;
}, c = (i, s, e = {}) => (s = encodeURIComponent(s), g(i, s, e)), v = (i, s) => {
  const e = i.req.raw.headers.get("Cookie");
  return typeof s == "string" ? e ? d(e, s)[s] : void 0 : e ? d(e) : {};
}, q = (i, s, e, r) => {
  const n = c(s, e, { path: "/", ...r });
  i.header("set-cookie", n, { append: !0 });
};
const C = m((i) => ({
  app: i,
  createRoute: ({ method: s, path: e, handler: r }) => {
    ({
      get: i.get,
      post: i.post,
      put: i.put,
      patch: i.patch,
      delete: i.delete,
      options: i.options
    })[s](e, async (t) => t.json(
      await r({
        request: t.req,
        response: t.res,
        method: t.req.method,
        params: t.req.param() || {},
        query: t.req.query() || {},
        body: await t.req.json(),
        setStatusCode: (o) => t.status(o),
        setHeader: (o, a) => t.header(o, a),
        getHeader: (o) => t.req.header(o) || null,
        headers: t.req.header(),
        setCookie: (o, a, u) => q(t, o, a, u),
        getCookie: (o) => v(t, o) || null
      })
    ));
  }
}));
export {
  C as honoProvider
};
