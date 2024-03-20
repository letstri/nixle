import { createProvider as m } from "nixle";
var h = decodeURIComponent, f = /^[\w!#$%&'*.^`|~+-]+$/, l = /^[ !#-:<-[\]-~]*$/, d = (t, s) => t.trim().split(";").reduce((r, n) => {
  n = n.trim();
  const i = n.indexOf("=");
  if (i === -1)
    return r;
  const a = n.substring(0, i).trim();
  if (s && s !== a || !f.test(a))
    return r;
  let o = n.substring(i + 1).trim();
  return o.startsWith('"') && o.endsWith('"') && (o = o.slice(1, -1)), l.test(o) && (r[a] = h(o)), r;
}, {}), c = (t, s, e = {}) => {
  let r = `${t}=${s}`;
  return e && typeof e.maxAge == "number" && e.maxAge >= 0 && (r += `; Max-Age=${Math.floor(e.maxAge)}`), e.domain && (r += `; Domain=${e.domain}`), e.path && (r += `; Path=${e.path}`), e.expires && (r += `; Expires=${e.expires.toUTCString()}`), e.httpOnly && (r += "; HttpOnly"), e.secure && (r += "; Secure"), e.sameSite && (r += `; SameSite=${e.sameSite}`), e.partitioned && (r += "; Partitioned"), r;
}, g = (t, s, e = {}) => (s = encodeURIComponent(s), c(t, s, e)), v = (t, s) => {
  const e = t.req.raw.headers.get("Cookie");
  return typeof s == "string" ? e ? d(e, s)[s] : void 0 : e ? d(e) : {};
}, q = (t, s, e, r) => {
  const n = g(s, e, { path: "/", ...r });
  t.header("set-cookie", n, { append: !0 });
};
const C = m((t) => ({
  app: t,
  createRoute: ({ method: s, path: e, handler: r }) => {
    ({
      get: t.get,
      post: t.post,
      put: t.put,
      patch: t.patch,
      delete: t.delete,
      options: t.options
    })[s](e, async (i) => i.json(
      await r({
        request: i.req,
        response: i.res,
        method: i.req.method,
        params: i.req.param() || {},
        query: i.req.query() || {},
        body: ["post", "put", "patch", "delete"].includes(s) ? await i.req.json() : {},
        redirect: async (a, o) => {
          await i.redirect(a, o);
        },
        setStatusCode: (a) => i.status(a),
        setHeader: (a, o) => i.header(a, o),
        getHeader: (a) => i.req.header(a) || null,
        headers: i.req.header(),
        setCookie: (a, o, u) => q(i, a, o, u),
        getCookie: (a) => v(i, a) || null
      })
    ));
  }
}));
export {
  C as honoProvider
};
