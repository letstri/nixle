import { createProvider as m } from "nixle";
var f = decodeURIComponent, c = /^[\w!#$%&'*.^`|~+-]+$/, l = /^[ !#-:<-[\]-~]*$/, u = (i, t) => i.trim().split(";").reduce((r, n) => {
  n = n.trim();
  const s = n.indexOf("=");
  if (s === -1)
    return r;
  const o = n.substring(0, s).trim();
  if (t && t !== o || !c.test(o))
    return r;
  let a = n.substring(s + 1).trim();
  return a.startsWith('"') && a.endsWith('"') && (a = a.slice(1, -1)), l.test(a) && (r[o] = f(a)), r;
}, {}), h = (i, t, e = {}) => {
  let r = `${i}=${t}`;
  return e && typeof e.maxAge == "number" && e.maxAge >= 0 && (r += `; Max-Age=${Math.floor(e.maxAge)}`), e.domain && (r += `; Domain=${e.domain}`), e.path && (r += `; Path=${e.path}`), e.expires && (r += `; Expires=${e.expires.toUTCString()}`), e.httpOnly && (r += "; HttpOnly"), e.secure && (r += "; Secure"), e.sameSite && (r += `; SameSite=${e.sameSite}`), e.partitioned && (r += "; Partitioned"), r;
}, g = (i, t, e = {}) => (t = encodeURIComponent(t), h(i, t, e)), v = (i, t) => {
  const e = i.req.raw.headers.get("Cookie");
  return typeof t == "string" ? e ? u(e, t)[t] : void 0 : e ? u(e) : {};
}, $ = (i, t, e, r) => {
  const n = g(t, e, { path: "/", ...r });
  i.header("set-cookie", n, { append: !0 });
};
const b = m((i) => ({
  app: i,
  createRoute: (t, e, r) => {
    ({
      get: i.get,
      post: i.post,
      put: i.put,
      patch: i.patch,
      delete: i.delete,
      options: i.options
    })[t](
      e,
      async (s) => s.body(
        await r({
          request: s.req,
          response: s.res,
          params: s.req.param() || {},
          query: s.req.query() || {},
          setStatusCode: (o) => s.status(o),
          setHeader: (o, a) => s.header(o, a),
          getHeader: (o) => s.req.header(o) || null,
          setCookie: (o, a, d) => $(s, o, a, d),
          getCookie: (o) => v(s, o) || null
        })
      )
    );
  }
}));
export {
  b as honoProvider
};
