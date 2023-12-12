import { createProvider as m } from "nixle";
var c = decodeURIComponent, f = /^[\w!#$%&'*.^`|~+-]+$/, g = /^[ !#-:<-[\]-~]*$/, l = (r, a) => r.trim().split(";").reduce((t, s) => {
  s = s.trim();
  const n = s.indexOf("=");
  if (n === -1)
    return t;
  const i = s.substring(0, n).trim();
  if (a && a !== i || !f.test(i))
    return t;
  let o = s.substring(n + 1).trim();
  return o.startsWith('"') && o.endsWith('"') && (o = o.slice(1, -1)), g.test(o) && (t[i] = c(o)), t;
}, {}), v = (r, a, e = {}) => {
  let t = `${r}=${a}`;
  return e && typeof e.maxAge == "number" && e.maxAge >= 0 && (t += `; Max-Age=${Math.floor(e.maxAge)}`), e.domain && (t += `; Domain=${e.domain}`), e.path && (t += `; Path=${e.path}`), e.expires && (t += `; Expires=${e.expires.toUTCString()}`), e.httpOnly && (t += "; HttpOnly"), e.secure && (t += "; Secure"), e.sameSite && (t += `; SameSite=${e.sameSite}`), e.partitioned && (t += "; Partitioned"), t;
}, q = (r, a, e = {}) => (a = encodeURIComponent(a), v(r, a, e)), w = (r, a) => {
  const e = r.req.raw.headers.get("Cookie");
  return typeof a == "string" ? e ? l(e, a)[a] : void 0 : e ? l(e) : {};
}, b = (r, a, e, t) => {
  const s = q(a, e, { path: "/", ...t });
  r.header("set-cookie", s, { append: !0 });
}, y = class {
  constructor() {
    this.createMiddleware = (r) => r;
  }
  createHandlers(...r) {
    return r.filter((a) => a !== void 0);
  }
}, C = () => new y(), $ = (r) => C().createMiddleware(r);
const H = m((r) => ({
  app: r,
  globalMiddleware: (a) => {
    r.use(
      "*",
      $(async (e, t) => {
        await a({
          url: e.req.url,
          method: e.req.method,
          setHeader: (s, n) => e.res.headers.set(s, n),
          getHeader: (s) => e.req.header(s) || null,
          headers: e.req.header()
        }), await t();
      })
    );
  },
  createRoute: ({ method: a, path: e, middleware: t, handler: s }) => {
    ({
      get: r.get,
      post: r.post,
      put: r.put,
      patch: r.patch,
      delete: r.delete,
      options: r.options
    })[a](e, async (i) => {
      const o = {
        request: i.req,
        response: i.res,
        method: i.req.method,
        params: i.req.param() || {},
        query: i.req.query() || {},
        body: await i.req.json(),
        setStatusCode: (d) => i.status(d),
        setHeader: (d, u) => i.header(d, u),
        getHeader: (d) => i.req.header(d) || null,
        headers: i.req.header(),
        setCookie: (d, u, h) => b(i, d, u, h),
        getCookie: (d) => w(i, d) || null
      };
      return await t(o), i.body(await s(o));
    });
  }
}));
export {
  H as honoProvider
};
