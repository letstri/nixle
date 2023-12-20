import { createProvider as l } from "nixle";
var h = decodeURIComponent, m = /^[\w!#$%&'*.^`|~+-]+$/, c = /^[ !#-:<-[\]-~]*$/, n = (r, a) => r.trim().split(";").reduce((t, s) => {
  s = s.trim();
  const i = s.indexOf("=");
  if (i === -1)
    return t;
  const o = s.substring(0, i).trim();
  if (a && a !== o || !m.test(o))
    return t;
  let d = s.substring(i + 1).trim();
  return d.startsWith('"') && d.endsWith('"') && (d = d.slice(1, -1)), c.test(d) && (t[o] = h(d)), t;
}, {}), f = (r, a, e = {}) => {
  let t = `${r}=${a}`;
  return e && typeof e.maxAge == "number" && e.maxAge >= 0 && (t += `; Max-Age=${Math.floor(e.maxAge)}`), e.domain && (t += `; Domain=${e.domain}`), e.path && (t += `; Path=${e.path}`), e.expires && (t += `; Expires=${e.expires.toUTCString()}`), e.httpOnly && (t += "; HttpOnly"), e.secure && (t += "; Secure"), e.sameSite && (t += `; SameSite=${e.sameSite}`), e.partitioned && (t += "; Partitioned"), t;
}, g = (r, a, e = {}) => (a = encodeURIComponent(a), f(r, a, e)), v = (r, a) => {
  const e = r.req.raw.headers.get("Cookie");
  return typeof a == "string" ? e ? n(e, a)[a] : void 0 : e ? n(e) : {};
}, q = (r, a, e, t) => {
  const s = g(a, e, { path: "/", ...t });
  r.header("set-cookie", s, { append: !0 });
}, w = class {
  constructor() {
    this.createMiddleware = (r) => r;
  }
  createHandlers(...r) {
    return r.filter((a) => a !== void 0);
  }
}, $ = () => new w(), b = (r) => $().createMiddleware(r);
const C = l((r) => ({
  app: r,
  globalMiddleware: (a) => {
    r.use(
      "*",
      b(async (e, t) => {
        await a({
          url: e.req.url,
          method: e.req.method,
          setHeader: (s, i) => e.res.headers.set(s, i),
          getHeader: (s) => e.req.header(s) || null,
          headers: e.req.header()
        }), await t();
      })
    );
  },
  createRoute: ({ method: a, path: e, handler: t }) => {
    ({
      get: r.get,
      post: r.post,
      put: r.put,
      patch: r.patch,
      delete: r.delete,
      options: r.options
    })[a](e, async (i) => i.json(
      await t({
        request: i.req,
        response: i.res,
        method: i.req.method,
        params: i.req.param() || {},
        query: i.req.query() || {},
        body: await i.req.json(),
        setStatusCode: (o) => i.status(o),
        setHeader: (o, d) => i.header(o, d),
        getHeader: (o) => i.req.header(o) || null,
        headers: i.req.header(),
        setCookie: (o, d, u) => q(i, o, d, u),
        getCookie: (o) => v(i, o) || null
      })
    ));
  }
}));
export {
  C as honoProvider
};
