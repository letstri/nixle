import E from "picocolors";
import { createConsola as d } from "consola";
import h from "dayjs";
const f = "YYYY-MM-DD HH:mm:ss", x = (e, t) => Object.fromEntries(Object.entries(e).filter(([r]) => !t.includes(r))), w = (e) => e !== Object(e);
class i extends Error {
  constructor({ message: t, statusCode: r, ...o }) {
    super(t), this.time = h().format(f), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = r || 400, Object.assign(this, o), Error.captureStackTrace(this, this.constructor);
  }
}
function a(e) {
  throw typeof e == "string" ? new i({ message: e, isInternal: !0 }) : new i({ ...e, isInternal: !0 });
}
function P(e) {
  throw typeof e == "string" ? new i({ message: e }) : new i(e);
}
const O = (e) => e instanceof i, c = (e) => {
  O(e) ? n(e.isInternal && e.stack || e.message, { type: "error" }) : e instanceof Error ? n(e.stack || e.message, { type: "error" }) : w(e) ? n(e, { type: "error" }) : n(`${e.constructor.name} ${JSON.stringify(e)}`, { type: "error" });
  const t = ["name", "stack", "message", "statusCode", "time", "isInternal"], r = {
    statusCode: e.statusCode || 500,
    message: e.message || "Internal Server Error",
    time: e.time || h().format(f)
  };
  return e instanceof Error && Object.assign(
    r,
    x(JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))), t)
  ), r;
};
let m = d();
const b = (e) => {
  m = d(e);
}, n = (e, t) => {
  const r = t?.type || "log", o = `${E.bgBlue(" Nixle ")}`, s = m?.[r || "log"];
  s || a(`Logger method "${r}" not found`), s(`${o} ${e}`);
}, u = (e) => {
  const t = e.startsWith("/") ? e : `/${e}`;
  return t.endsWith("/") ? t.slice(0, -1) : t;
}, C = (e, t, r) => {
  const o = r({ log: n });
  if (o.length === 0)
    try {
      a("At least one router is required");
    } catch (s) {
      c(s), process.exit(1);
    }
  if (o.some((s) => !s.path || !s.handler))
    try {
      a("Path and handler are required for each route");
    } catch (s) {
      c(s), process.exit(1);
    }
  o.forEach((s) => {
    const g = s.method ? s.method.toLowerCase() : "get", p = u(t) + u(s.path);
    e.request(g, p, async (l) => {
      l.setHeader("x-powered-by", "Nixle"), s.statusCode && l.setStatusCode(s.statusCode);
      try {
        return await s.handler(l);
      } catch (y) {
        throw c(y);
      }
    });
  });
}, S = (e, t) => [e, t], $ = (e) => e({ log: n }), M = (e) => e, N = (e, t) => {
  t.forEach((r) => {
    r.routers.forEach(([o, s]) => {
      C(e, o, s);
    });
  });
}, q = ({ provider: e, logger: t, ...r }) => {
  if (!e)
    try {
      a("Provider is required");
    } catch (o) {
      c(o), process.exit(1);
    }
  if (t !== void 0 && b(t), n("Starting an application...", { type: "info" }), r.modules.length === 0)
    try {
      a("At least one module is required");
    } catch (o) {
      c(o), process.exit(1);
    }
  return N(e, r.modules), n("Application started!", { type: "success" }), e.server;
}, v = (e) => e;
export {
  q as createApp,
  P as createError,
  M as createModule,
  v as createProvider,
  S as createRouter,
  $ as createService
};
