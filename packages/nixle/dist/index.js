import y from "picocolors";
import { createConsola as l } from "consola";
import m from "dayjs";
const f = "YYYY-MM-DD HH:mm:ss";
class c extends Error {
  constructor({ message: e, statusCode: s, ...o }) {
    super(e), this.time = m().format(f), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = s || 400, Object.assign(this, o), Error.captureStackTrace(this, this.constructor);
  }
}
function u(t) {
  throw typeof t == "string" ? new c({ message: t, isInternal: !0 }) : new c({ ...t, isInternal: !0 });
}
function S(t) {
  throw typeof t == "string" ? new c({ message: t }) : new c(t);
}
const E = (t) => t instanceof c;
let d = l();
const w = (t) => {
  d = l(t);
}, r = (t, e) => {
  const s = e?.type || "log", o = `${y.bgBlue(" Nixle ")}`, n = d?.[s || "log"];
  n || u(`Logger method "${s}" not found`), n(`${o} ${t}`);
}, a = (t) => {
  const e = t.startsWith("/") ? t : `/${t}`;
  return e.endsWith("/") ? e.slice(0, -1) : e;
}, x = (t, e) => Object.fromEntries(Object.entries(t).filter(([s]) => !e.includes(s))), O = (t) => t !== Object(t), h = (t) => {
  E(t) ? r(t.isInternal && t.stack || t.message, { type: "error" }) : t instanceof Error ? r(t.stack || t.message, { type: "error" }) : O(t) ? r(t, { type: "error" }) : r(`${t.constructor.name} ${JSON.stringify(t)}`, { type: "error" });
  const e = ["name", "stack", "message", "statusCode", "time", "isInternal"], s = {
    statusCode: t.statusCode || 500,
    message: t.message || "Internal Server Error",
    time: t.time || m().format(f)
  };
  return t instanceof Error && Object.assign(
    s,
    x(JSON.parse(JSON.stringify(t, Object.getOwnPropertyNames(t))), e)
  ), s;
}, b = (t, e, s) => {
  s({ log: r }).forEach((o) => {
    const n = o.method ? o.method.toLowerCase() : "get", g = a(e) + a(o.path);
    t.request(n, g, async (i) => {
      i.setHeader("x-powered-by", "Nixle"), o.statusCode && i.setStatusCode(o.statusCode);
      try {
        return await o.handler(i);
      } catch (p) {
        throw h(p);
      }
    });
  });
}, P = (t, e) => [t, e], $ = (t) => t({ log: r }), A = (t) => t, C = (t, e) => {
  e.forEach((s) => {
    s.routers.forEach(([o, n]) => {
      b(t, o, n);
    });
  });
}, M = ({ provider: t, logger: e, ...s }) => {
  if (!t)
    try {
      u("Provider is required");
    } catch (o) {
      h(o), process.exit(1);
    }
  return e !== void 0 && w(e), r("Starting an application...", { type: "info" }), C(t, s.modules), r("Application started!", { type: "success" }), t.server;
}, v = (t) => t;
export {
  M as createApp,
  S as createError,
  A as createModule,
  v as createProvider,
  P as createRouter,
  $ as createService
};
